const User = require('../models/user');

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path : '/login',
        pageTitle : 'Login',
        isAuthenticated : req.session.isLoggedIn
    });
};

module.exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; HttpOnly');
    User.findById('5f2f72926723572b08f9b755')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                // console.log(err + " in postLogin ----->");
                res.redirect('/');
            });
        })
        .catch(err => console.log("Error in postLogin : " + err));
};

module.exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        // console.log(err + " in postLogout");
        res.redirect('/');
    });
}