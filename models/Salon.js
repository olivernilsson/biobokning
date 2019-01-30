const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let salonSchema = new Schema ( {
    "name": String,
    "seatsPerRow": [Number]

});

class SalonClass {

}

salonSchema.loadClass(SalonClass);
module.exports = db.model('Salon', salonSchema);