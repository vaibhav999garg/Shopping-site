const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req,res,next) =>{
    Product.find()
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
    Product.find()
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
    Product.findById(prodId)//converts id to ObjectId itself
        .then(product => {
            res.render('shop/product-details', {
                pageTitle : product.title,
                product : product,
                path : '/products'
            });
        })
        .catch(err => console.log("Error in getProduct in shopController : " + err));
};


exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            // console.log(result);
            res.redirect('/cart');
        })
        .catch(err  => console.log("Error in postCart in shopController : " + err));
};

exports.getCart = (req,res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            products = user.cart.items;
            res.render('shop/cart', {
                path : '/cart',
                pageTitle : 'Your Cart',
                products : products,
                // totalPrice : cartPrice
            });
        })
        .catch(err => console.log("Error in getCart in shopController : "+err));
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

exports.postCreateOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            products = user.cart.items.map(prod => {
                return {product : {...prod.productId._doc}, quantity : prod.quantity}
            }); 
            const order = new Order({
                products : products,
                user : {
                    name : req.user.name,
                    userId : req.user
                }
            });
            order.save();
        })
        .then(result => {
            req.user.clearCart(); 
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log("Error in postCreateOrder : " + err));
}   

exports.getOrders = (req,res, next) => {
    Order.find({'user.userId' : req.user._id})
        .then(orders => {
            res.render('shop/orders', {
                path : '/orders',
                pageTitle : 'Your orders',
                orders : orders
            });
        })
        .catch(err => console.log(err));
};

// exports.getCheckout = (req,res,next) => {
//     res.render('shop/checkout', {
//         path : '/checkout',
//         pageTitle : 'Checkout'
//     });
// };