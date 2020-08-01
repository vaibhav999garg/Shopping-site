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
    const products = new Product(null, title, price, description, imageURL);
    products.save();
    res.redirect('/products');
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return  res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product){
            return  res.redirect('/');
        }
        res.render('admin/edit-product', {
            path: '/admin/edit-product',
            pageTitle:'Edit-Product',
            editing : "true",
            product : product
        });
    });
};

exports.postEditProduct = (req,res,next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const id = req.body.productId;
    const products = new Product(id, title, price, description, imageURL);
    products.save();
     res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
}

exports.getProducts = (req,res,next) =>{       
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods : products,
            pageTitle : 'Admin products',
            path : '/admin/products'
        });
    });
};