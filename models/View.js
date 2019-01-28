const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let viewSchema = new Schema ({
    "auditorium": String,
    "film": String,
    "date": String,
    "time": String

});

 
//class in case it's needed

class ViewClass {

}

viewSchema.loadClass(ViewClass);
module.exports = db.model('View',viewSchema);