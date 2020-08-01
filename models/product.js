const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');
const Cart = require('./cart');

const p = path.join(rootdir, 'data', 'products.json');

const getProductFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            callback([]);
        }
        else{ 
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product{
    constructor(id, title, price, description, imageURL){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
        this.id = id;
    }

    save(){
        getProductFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }
            else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductFromFile(products => {
            const product = products.find(p => p.id == id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(err){
                    console.log(err);
                }
                else{
                    Cart.DeleteProduct(id,product.price);
                }
            })
        });
    }

    static fetchAll(callback){
         getProductFromFile(callback);
    }

    static findById(id, cb){
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id);
            cb(product);
        });
    }
};  