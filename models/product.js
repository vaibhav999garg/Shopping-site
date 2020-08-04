const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type : Sequelize.DOUBLE,
        allowNull : false
    },
    description : {
        type : Sequelize.STRING,
        allowNull : false
    },
    imageURL : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = Product;



// module.exports = class Product{
//     constructor(id, title, price, description, imageURL){
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageURL = imageURL;
//         this.id = id;
//     }

//     save(){
//         return db.execute(
//             'INSERT INTO products (title, price, description, imageURL) VALUES(?,?,?,?)',
//             [this.title, this.price, this.description, this.imageURL]
//         );
//     }

//     static deleteById(id){
        
//     }

//     static fetchAll(){
//         return db.execute('SELECT * FROM products');
//     }

//     static findById(id){
//         return db.execute(
//             'SELECT * FROM products WHERE products.id = ?', 
//             [id]
//         );
//     }
// };  