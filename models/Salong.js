const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let salongSchema = new Schema ( {
    "name": {type: Schema.Types.ObjectId, ref: 'Name'},
    "seatsPerRow": Number

});

class SalongClass {

}

salongSchema.loadClass(SalongClass);
module.exports = db.model('Salong', salongSchema);