const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Your password', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;