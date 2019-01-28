const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    "FirstName":{type: String, require: true},
    "LastName":{type: String, require: true},
    "email":{type: String, require: true, unique: true},
    "password":{type: String, require: true}

});



module.exports = db.model('User', userSchema);