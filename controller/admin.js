const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle:'Add-Product'
    });
}   

exports.postAddProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const products = new Product(title, price, description, imageURL);
    products.save();
    res.redirect('/products');
}

exports.getProducts = (req,res,next) =>{       
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods : products,
            pageTitle : 'Admin products',
            path : '/admin/products'
        });
    })
}