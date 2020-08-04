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




//node modules - some are included by express itself
const path = require('path');

// third party modules
const express = require('express');
const bodyParser = require('body-parser');

//my own modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootdir = require('./util/path');
const errorController =require('./controller/error');
const sequelize = require('./util/database');

const app = express();

// to use templates
app.set('view engine', 'ejs');
// what to search, where to search(folder name), currently same, no need to write
// app.set('views', 'views');

// to store data in the body
app.use(bodyParser.urlencoded({extended: true}));
// to statically import files
app.use(express.static(path.join(rootdir, 'public'))); 


// routing
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404); 
//if we give input wrong image link then gives error... because of request resend by browser.... have to see this.

sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(9000, () => {
            console.log(`Server started on port`);
        });
    })
    .catch(err => {
        console.log(err);
    });




