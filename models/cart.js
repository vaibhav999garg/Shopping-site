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

    static DeleteProduct(id, productPrice){
        fs.readFile(pathCart, (err, fileContent) => {
            if(err){
                return;
            }
            let cart = JSON.parse(fileContent);
            const product = cart.products.find(x => x.id === id);
            if(!product){
                return;
            }
            const updatedCartProducts = cart.products.filter(x => x.id !== id);
            const updatedCartPrice = cart.totalPrice - product.qty*productPrice;
            const updatedCart = {products : updatedCartProducts, totalPrice : updatedCartPrice};
            fs.writeFile(pathCart, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static fetchCart(cb){
        
    }
};