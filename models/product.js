const mongoose = require('mongoose');
const { Double } = require('mongodb');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    //id will be added automatically
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

module.exports = mongoose.model('Product', productSchema);


// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product{
//     constructor(id, title, price, description, imageURL, userId){
//         this._id = id ? new mongoDb.ObjectId(id) : null;
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageURL = imageURL;
//         this.userId = userId;
//     }

//     save(){
//         const db = getDb();
//         let prod;
//         if(this._id){
//             prod =db.collection('products')
//                     .updateOne({_id : this._id}, {$set : this});
//         }
//         else{
//             prod =db.collection('products')
//                     .insertOne(this);
//         }

//         return prod
//             .then()
//             .catch(err => console.log('Error in save in Product : ' + err));
//     }

//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 // console.log(products);
//                 return products;
//             })
//             .catch(err => console.log('Error in fetchAll in Product : ' + err));
//     }

//     static fetchById(id){
//         const db = getDb();
//         return db.collection('products')
//             .findOne({_id : new mongoDb.ObjectId(id)});
//     }

//     static deleteById(id){
//         const db = getDb();
//         return db.collection('products')
//             .deleteOne({_id : new mongoDb.ObjectId(id)})
//             .then(result => {
//                 console.log('Deleted!');
//             })
//             .catch(err => console.log('Error in deleteById in products : ' + err));
//     }
// };


// module.exports = Product;