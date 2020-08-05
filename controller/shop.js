const Product = require('../models/product');
const Cart = require('../models/cart');

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
    req.user
        .getCart()
        .then(cart => {
            // console.log("\n\n\n" + Object.keys(cart));
            return cart.getProducts();
        })
        .then(products => {
            res.render('shop/cart', {
                path : '/cart',
                pageTitle : 'Your Cart',
                products : products,
                // totalPrice : cartPrice
            });
        })
        .catch(err => console.log("Error in getCart : "+err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where : {id : productId}});
        })
        .then(products => {
            let product;
            if(products && products.length){
                product = products[0];
            }
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            else{
                return Product.findByPk(productId);
            }
        })
        .then(product => {
            return fetchedCart.addProduct(product, {through : {quantity : newQuantity}});
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err  => console.log("Error in postCart" + err));
};

exports.postCartDeleteProduct = (req,res , next) => {
    const productId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where : {id : productId}});
            
        })
        .then(products => {
            const product = products[0];
            product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log("Error in postCartDeleleProduct : " + err));
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