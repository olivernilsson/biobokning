const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Create a schema for a film
let filmSchema = new Schema(  {
    "title" :  String,
    "productionCountries" : String,
    "productionYear" : Number,
    "length" : Number,
    "desc" : String,
    "regi" : String,
    "actor" : String,
    "language" : String,
    "subtitle" : String,
    "premier" : String,
    "trailer" : String,
    "image" : String,
    "review": String
  });
  
/* Example properties:
  "author": { type: String, required: true },
  "link": { type: String, unique: true, required: true },
*/

// 2. Create a class with methods/or getters/setters
//    that every Film should have

  
  // 3. Create the model and export it
  filmSchema.loadClass(filmClass);
  module.exports = db.model('Film', filmSchema);
  