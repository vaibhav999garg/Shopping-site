const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController =require('./controller/error');

const User = require('./models/user');

const rootdir = require('./util/path');

const app = express();

app.set('view engine', 'ejs');
// what to search, where to search(folder name), currently same, no need to write
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootdir, 'public'))); 

app.use((req,res,next) => {
    User.findById('5f2f72926723572b08f9b755')
        .then(user => {
            req.user = user;
            // console.log(user);
            next();
        })
        .catch(err => console.log("Error in user miiddleware : " + err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);



mongoose
    .connect(
        'URL From your database of mongoDB',
        { useUnifiedTopology: true }
    )
    .then(() => {
        User.findOne()
            .then(user => {
                if(!user){
                    const user = new User({
                        name : 'Vg',
                        email : 'test@test.com',
                        cart : {
                            items : []
                        }
                    });
                    user.save();
                }
            })
            .catch(err => 'Error in creating user in main : ' + err);
        
        app.listen(3000, () => {
            console.log(`Server started at port`);
        });
    })
    .catch(err => console.log('Error in starting!!! : ' + err));
