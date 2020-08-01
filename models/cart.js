const fs = require('fs');
const path = require('path');

const rootdir = require('../util/path');

const pathCart = path.join(rootdir, 'data', 'cart.json');


module.exports = class cart{
    static addProduct(id, productPrice){
        //fetch previous cart
        fs.readFile(pathCart, (err, fileContent) => {
            let cart = {products : [], totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            
            //analyse the cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //increase quantity / add new product
            if(existingProduct){
                updatedProduct  = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;

            //write to the cart.json
            fs.writeFile(pathCart, JSON.stringify(cart), err => {
                console.log("\n" + err);
            });
        });
    }

    static fetchCart(cb){
        
    }
};