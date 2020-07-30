const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

module.exports = router;