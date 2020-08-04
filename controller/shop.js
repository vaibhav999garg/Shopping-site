const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req,res,next) =>{   
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods : products,
                pageTitle : 'All Products',
                path : '/products'
            });
        })
        .catch(err => console.log("Error in getProducts : "+err));
};

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-details', {
                pageTitle : product.title,
                product : product,
                path : '/products'
            });
        })
        .catch(err => console.log("Error in getProduct : " + err));
    
};

exports.getCart = (req,res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            const cartPrice = cart.totalPrice;
            for(product of  products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData : product, qty : cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path : '/cart',
                pageTitle : 'Your Cart',
                products : cartProducts,
                totalPrice : cartPrice
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    });

    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res , next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.DeleteProduct(productId, product.price);
         res.redirect('/cart');
    })
}

exports.getIndex = (req,res,next) =>{
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods : products,
                pageTitle : 'Shop Index',
                path : '/'
            });
        })
        .catch(err => console.log("Error in getIndex : "+err));    
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path : '/checkout',
        pageTitle : 'Checkout'
    });
};

exports.getOrders = (req,res, next) => {
    res.render('shop/orders', {
        path : '/orders',
        pageTitle : 'Your orders'
    });
};