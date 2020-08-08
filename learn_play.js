const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController =require('./controller/error');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const rootdir = require('./util/path');

const app = express();

app.set('view engine', 'ejs');
// what to search, where to search(folder name), currently same, no need to write
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootdir, 'public'))); 

app.use((req,res,next) => {
    User.fetchById('5f2e41836b690e45bd2123f3')
        .then(user => {
            req.user = new User(user._id, user.name, user.email, user.cart);
            next();
        })
        .catch(err => console.log("Error in user miiddleware : " + err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


mongoConnect(() => {
    app.listen(3000, () => {
        console.log(`Server started at port`);
    });
});