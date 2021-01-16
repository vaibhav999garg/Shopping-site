const express = require('express');

const shopController = require('../controller/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/cart',isAuth , shopController.postCart);
router.get('/cart',isAuth , shopController.getCart);
router.post('/cart-delete-product',isAuth , shopController.postCartDeleteProduct);

router.post('/create-order',isAuth , shopController.postCreateOrder);
router.get('/orders',isAuth , shopController.getOrders);

// // router.get('/checkout', shopController.getCheckout);

module.exports = router;