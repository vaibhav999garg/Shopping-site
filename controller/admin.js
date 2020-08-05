const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle:'Add-Product',
        editing : false
    });
};

exports.postAddProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    req.user
        .createProduct({
            title : title,
            price : price,
            description : description,
            imageURL : imageURL
        })
        .then(() => {
            // console.log(Object.keys((req.user)._proto_));

            res.redirect('/admin/products');
        })
        .catch(err => console.log("Error in postAddProduct : "+err));;
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return  res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({where: {id : prodId}})
    // Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if(!product){
                return  res.redirect('/');
            }
            res.render('admin/edit-product', {
                path: '/admin/edit-product',
                pageTitle:'Edit-Product',
                editing : "true",
                product : product
            });
        })
        .catch(err => console.log("Error in getEditProduct : "+err));
};

exports.postEditProduct = (req,res,next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const id = req.body.productId;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageURL = imageURL;
            
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log("Error in postEditProduct : " + err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log("Error in postDeleteProduct" + err));
}

exports.getProducts = (req,res,next) =>{
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods : products,
                pageTitle : 'Admin products',
                path : '/admin/products'
            });
        })
        .catch(err => console.log("Error in admin products : " + err));
};