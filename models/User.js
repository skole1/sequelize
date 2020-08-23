const Sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('users', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    passowrd:{
        type:Sequelize.STRING
    }
});

module.exports = User;