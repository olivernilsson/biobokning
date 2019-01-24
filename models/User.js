const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    "FirstName":{type: String, require: true, unique: true},
    "LastName":{type: String, require: true, unique: true},
    "email":{type: String, require: true, unique: true},
    "password":{type: String, require: true, unique: true}

});



module.exports = db.model('User', userSchema);