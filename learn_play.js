const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController =require('./controller/error');
const User = require('./models/user');

const MONGODB_URI = 'your database link form mongoDB site';

const rootdir = require('./util/path');

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collections: 'sessions'
});

app.set('view engine', 'ejs');
// what to search, where to search(folder name), currently same, no need to write
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootdir, 'public')));
app.use(session({
    secret:'Its a secret',
    resave : false,
    saveUninitialized : false,
    store: store
    //can also set cookie like max-age or expires etc.
    }
));

app.use((req,res,next) => {
    if(!req.session.user){
        // console.log("Returning back....." + req.session.user +" bye !");
        return next();
    }
    // console.log("It is on the way");
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            // console.log(user);
            // console.log("Its here");
            next();
        })
        .catch(err => console.log("Error in user miiddleware : " + err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);



mongoose
    .connect(
        MONGODB_URI,
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
        
        app.listen(5000, () => {
            console.log(`Server started at port`);
        });
    })
    .catch(err => console.log('Error in starting!!! : ' + err));
