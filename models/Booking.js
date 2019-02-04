const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema ( {
    "user": {type: Schema.Types.ObjectId, ref: 'User'},
    "film": {type: Schema.Types.ObjectId, ref: 'Film'},
    "salon": {type: Schema.Types.ObjectId, ref: 'Salon'},
    "ticket": {type: Schema.Types.ObjectId, ref: 'Ticket'},
    "view": {type: Schema.Types.ObjectId, ref: 'View'},   
    "date": String,
    "time": String,
    "bookingId": {type: String, unique: true},
    "name": String
});


module.exports = db.model('Booking', bookingSchema);