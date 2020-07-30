const express = require('express');

const shopController = require('../controller/shop');

const router = express.Router();


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);


module.exports = router;