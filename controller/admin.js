const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle:'Add-Product',
        editing : false,
        isAuthenticated : req.session.isLoggedIn
    });
};

exports.postAddProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const product = new Product({
        title : title,
        price : price,
        description : description,
        imageURL : imageURL,
        userId : req.user
    });
    product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log("Error in postAddProduct : "+err));;
};

exports.getProducts = (req,res,next) =>{
    Product.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            res.render('admin/products', {
                prods : products,
                pageTitle : 'Admin products',
                path : '/admin/products',
                isAuthenticated : req.session.isLoggedIn
            });
        })
        .catch(err => console.log("Error in admin products : " + err));
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return  res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if(!product){
                return  res.redirect('/');
            }
            res.render('admin/edit-product', {
                path: '/admin/edit-product',
                pageTitle:'Edit-Product',
                editing : editMode  ,
                product : product,
                isAuthenticated : req.session.isLoggedIn
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

    Product.findById(id)
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
    Product.findByIdAndRemove(productId)
        .then(result => {   
            res.redirect('/admin/products');
        })
        .catch(err => console.log("Error in postDeleteProduct" + err));
}