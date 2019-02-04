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


function randomItem(arr){
    return arr[Math.floor(Math.random()*arr.length)];
 }
 
 bookingSchema.pre('save', function(){
    //  randomize a booking id
    if(this.bookingId){ return; }
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bookingId = '';
    while(bookingId.length < 6){ bookingId += randomItem(alphabet); }
    this.bookingId = bookingId;
 });

module.exports = db.model('Booking', bookingSchema);