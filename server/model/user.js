var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema
var userSchame = new Schema({
    userName: String,
    userEmail: String,
    userPassword: String
});

var User = mongoose.model('User', userSchame);

module.exports = User;