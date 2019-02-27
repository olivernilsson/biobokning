const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
   adults: Number,
   kids: Number,
   seniors: Number,
   user: {type: Schema.Types.ObjectId, ref: 'User'},
   view: { type: Schema.Types.ObjectId, ref: 'View' },
   seats: Array,
   bookingId: { type: String, unique: true }
});


function randomItem(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

bookingSchema.pre('save', function () {
   //  randomize a booking id
   if (this.bookingId) { return; }
   let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let bookingId = '';
   while (bookingId.length < 6) { bookingId += randomItem(alphabet); }
   this.bookingId = bookingId;
});

bookingSchema.pre('validate',async function (next,done) {
   let takenSeats=[];
   let bookingz= await this.constructor.find({view:this.view});

   for(let booking of bookingz){
   takenSeats= takenSeats.concat(booking.seats);
   }

   for(let seat of this.seats){
      if(takenSeats.includes(seat)){
         next(new Error('this seat is taken'));
         return
      }      
   }
   next();

});

module.exports = db.model('Booking', bookingSchema);