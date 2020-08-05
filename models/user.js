const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id : {
        type : Sequelize.INTEGER,
        allowNULL : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        allowNULL : false
    },
    email : {
        type : Sequelize.STRING,
        allowNULL : false
    }
});

module.exports = User;