const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for an author
let librarySchema = new Schema(  {
  "name": String,
  "adress": String,
});

module.exports = db.model('Library', librarySchema);
