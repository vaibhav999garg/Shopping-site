const express = require('express');

const router = express.Router();

router.get('/', (req,res,next) => {
    res.send('<form action="/add-product"><button type="submit">Go to Add product page</button></form>');
});

module.exports = {
    router : router
}