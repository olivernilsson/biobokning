const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for an author
let townSchema = new Schema(  {
  "name": String,
  "description": String,
  "library": [{type: Schema.Types.ObjectId, ref: 'Library'}]
});

module.exports = db.model('Town', townSchema);
