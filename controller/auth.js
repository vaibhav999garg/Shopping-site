const bcrypt = require('bcryptjs');
const user = require('../models/user');
const User = require('../models/user');

module.exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/login', {
        path : '/login',
        pageTitle : 'Login',
        errorMessage : message
    });
};

module.exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email : username})
        .then(user => {
            if(!user){
                req.flash('error', 'Invalid email!');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if(!result){
                        req.flash('error', "Incorrect password!");
                        return res.redirect('/login');
                    }
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save(err => {
                        // console.log(err + " in postLogin ----->");
                        res.redirect('/');
                    });
                })
                .catch(err => console.log("Error in postLogin bcrypt : " + err));

            
        })
        .catch(err => console.log("Error in postLogin : " + err));
};

module.exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        // console.log(err + " in postLogout");
        res.redirect('/');
    });
};

module.exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/signup', {
        path : '/signup',
        pageTitle : 'Signup',
        errorMessage : message
    });
};

module.exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password != confirmPassword){
        req.flash('error', 'Password and confirm password do not matched');
        return res.redirect('/signup');
    }
    User.findOne({email : email})
        .then(userDoc => {
            if(userDoc){
                req.flash('error', 'Email already exists!');
                return res.redirect('/signup');
            }
            return bcrypt.hash(password,12)
                .then(hashedPassword => {
                    const user = new User({
                        email : email,
                        password : hashedPassword, 
                        cart : []
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => console.log("Error in postSignup : " + err));
};