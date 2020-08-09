const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cart : {
        items : [{
            productId : { type : Schema.Types.ObjectId, ref : 'Product', required : true},
            quantity : { type : Number, required : true}
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else{
        updatedCartItems.push({productId : product, quantity : newQuantity});
    }
    const updatedCart = {
        items : updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteProductFromCart = function(productId) {
    const cartItems = this.cart.items.filter(i => i.productId.toString() !== productId.toString());
    this.cart.items = cartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items : []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const Product = require('./product');

// class User{
//     constructor(id, username, email, cart){
//         this._id = id;
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//     }

//     save(){
//         const db = getDb();
//         return db.collection('users').
//             insertOne(this)
//             .catch(err => console.log('Error in save in user : ' + err));
//     }

//     addToCart(product){
    // const db = getDb();
    // if(!this.cart){
    //     const updatedCart = { items : [{productId : new mongoDb.ObjectId(product._id), quantity : 1}] };
    //     return db.collection('users')
    //         .updateOne(
    //             {_id : new mongoDb.ObjectId(this._id)},
    //             {$set : {cart : updatedCart}}
    //         )
    //         .catch(err => console.log('Error in addToCart in user : ' + err));
    // }
    // const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
    // let newQuantity = 1;
    // const updatedCartItems = [...this.cart.items];
    // if(cartProductIndex >= 0){
    //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //     updatedCartItems[cartProductIndex].quantity = newQuantity;
    // }
    // else{
    //     updatedCartItems.push({productId : new mongoDb.ObjectId(product._id), quantity : newQuantity});
    // }
    // const updatedCart = {
    //     items : updatedCartItems
    // };
    
    // return db.collection('users')
    //     .updateOne(
    //         {_id : new mongoDb.ObjectId(this._id)},
    //         {$set : {cart : updatedCart}}
    //     )
    //     .catch(err => console.log('Error in addToCart in user : ' + err));
        
//     }

//     static fetchById(userId){
//         const db = getDb();
//         return db.collection('users')
//             .findOne({_id : new mongoDb.ObjectId(userId)})
//             .then(user => {
//                 return user;
//             })
//             .catch(err => console.log('Error in fetchById in user : ' + err));
//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         return db.collection('products')
//             .find({_id : {$in : productIds}})
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {...p, quantity : this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity }
//                 })
//             })
//             .catch(err => console.log('Error in getCart in user : ' + err));
//     }

//     deleteProductFromCart(prodId){
//         const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== prodId.toString());

//         const db = getDb();
//         return db.collection('users')
//             .updateOne(
//                 {_id : new mongoDb.ObjectId(this._id)},
//                 {$set : {cart : {items : updatedCartItems}}}
//             );
//     }

//     createOrder(){
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items : products,
//                     user : {
//                         _id : new mongoDb.ObjectId(this._id),
//                         name : this.name
//                     }
//                 }
//                 return db.collection('orders').insertOne(order);
//             })
//             .then(result => {
//                 return db.collection('users')
//                     .updateOne(
//                         {_id : new mongoDb.ObjectId(this._id)},
//                         {$set : {cart : { items : []}}}
//                     )
//             })
//             .catch(err => console.log('Error in createOrder in user : ' + err));
//     }

//     getOrders(){
//         const db = getDb();
//         return db.collection('orders')
//             .find({ 'user._id' : new mongoDb.ObjectId(this._id)})
//             .toArray()
//             .then(orders => {
//                 return orders;
//             })
//             .catch(err => console.log('Error in getCart in user : ' + err));
//     }
// };

// module.exports = User;