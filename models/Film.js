const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Create a schema for a film
let filmSchema = new Schema(  {
    "title" :  String,
    "productionCountries" : [String],
    "productionYear" : Number,
    "length" : Number,
    "description" : String,
    "director" : String,
    "actors" : [String], 
    "language" : String,
    "subtitle" : String,
    "premier" : Number,
    "trailer" : String,
    "images" : [String],
    "youtubeTrailers": [String],
    "review" : [String]
  });
  

// 2. Create a class with methods/or getters/setters
//    that every Film should have
class FilmClass {

}
  
  // 3. Create the model and export it
  filmSchema.loadClass(FilmClass);
  module.exports = db.model('Film', filmSchema);
  