// //setTimeout
// setTimeout(()=>{
//     console.log('This is executed after 2 seconds.');
//     fetchData(text => {
//         console.log(text);
//     });
// },2000);

// const fetchData = (callback) => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             resolve('Done!');
//         },1500);
//     });
//     setTimeout(() =>{
//         callback('This is inside the timeout.This is executed after 3.5 seconds.');
//     },1500);
//     return promise;
// };



const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootdir = require('./util/path');
const errorController =require('./controller/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
// what to search, where to search(folder name), currently same, no need to write
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootdir, 'public'))); 

app.use((req,res,next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log("Error in user miiddleware : " + err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404); 

Product.belongsTo(User, {constraints : true, onDelele : 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem});


sequelize
    // .sync({force : true})
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name : 'Dummy', email : 'bummy@bummy.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(9000, () => {
            console.log(`Server started on port`);
        });
    })
    .catch(err => {
        console.log("Error in main app : "+err);
    });




