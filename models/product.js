const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');

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
    constructor(title, price, description, imageURL){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
        this.id = Math.random().toString(); 
    }

    save(){
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(callback){
         getProductFromFile(callback);
    }

    static findById(id, cb){
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            // console.log(product);
            cb(product);
        })
    }
};  