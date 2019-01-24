const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketSchema = new Schema ( {
    "adult": Number,
    "children": Number,
    "pensionary": Number,
    "family2 + 1": Number,
    "family 2 + 2": Number,
    "family big": Number,
});
//class in case its needed
class TicketClass {

}

ticketSchema.loadClass(TicketClass);
module.exports = db.model('Ticket', ticketSchema);