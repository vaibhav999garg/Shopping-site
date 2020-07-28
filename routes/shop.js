const express = require('express');

const productController = require('../controller/products');

const router = express.Router();

router.get('/', productController.getProduct);

module.exports = router;