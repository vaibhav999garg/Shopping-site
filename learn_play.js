const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController =require('./controller/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://vaibhav-garg:VaibhavGarg123@cluster0.z3zwj.mongodb.net/test?retryWrites=true&w=majority';

const rootdir = require('./util/path');

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collections: 'sessions'
});

const csrfProtection = csrf();

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

app.use(csrfProtection);
app.use(flash());

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

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);


mongoose.set('useFindAndModify', false);
mongoose
    .connect(
        MONGODB_URI, 
        { useUnifiedTopology: true,
        useNewUrlParser : true }
    )
    .then(result => {
        app.listen(5000, () => {
            console.log(`Server started at port`);
        });
    })
    .catch(err => console.log('Error in starting!!! : ' + err));
