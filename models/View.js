const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let viewScheme = new Schema ({
    "auditorium": String,
    "film": String,
    "date": Number,
    "time": Number

});


//class in case it's needed

class ViewClass {

}

viewScheme.loadClass(ViewClass);
module.exports = db.model('View',viewSchema);