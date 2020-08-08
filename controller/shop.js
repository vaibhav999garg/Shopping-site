const Product = require('../models/product');

exports.getIndex = (req,res,next) =>{
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods : products,
                pageTitle : 'Shop Index',
                path : '/'
            });
        })
        .catch(err => console.log("Error in getIndex in shopController : "+err));    
};

exports.getProducts = (req,res,next) =>{   
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods : products,
                pageTitle : 'All Products',
                path : '/products'
            });
        })
        .catch(err => console.log("Error in getProducts in shopController : "+err));
};

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.fetchById(prodId)
        .then(product => {
            res.render('shop/product-details', {
                pageTitle : product.title,
                product : product,
                path : '/products'
            });
        })
        .catch(err => console.log("Error in getProduct in shopController : " + err));
};

exports.getCart = (req,res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path : '/cart',
                pageTitle : 'Your Cart',
                products : products,
                // totalPrice : cartPrice
            });
        })
        .catch(err => console.log("Error in getCart in shopController : "+err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchById(productId)
        .then(product => {
            return req.user.addToCart(product)
        .then(result => {
            // console.log(result);
            res.redirect('/cart');
        })
        .catch(err  => console.log("Error in postCart in shopController : " + err));
    })
    
};

exports.postCartDeleteProduct = (req,res , next) => {
    const productId = req.body.productId;
    req.user
        .deleteProductFromCart(productId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log("Error in postCartDeleleProduct in shopController : " + err));
}

// exports.getCheckout = (req,res,next) => {
//     res.render('shop/checkout', {
//         path : '/checkout',
//         pageTitle : 'Checkout'
//     });
// };

exports.getOrders = (req,res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                path : '/orders',
                pageTitle : 'Your orders',
                orders : orders
            });
        })
        .catch(err => console.log(err));
};

exports.postCreateOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .createOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log("Error in postCreateOrder : " + err));
}