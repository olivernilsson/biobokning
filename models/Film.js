const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Create a schema for a film
let filmSchema = new Schema(  {
    "title" :  String,
    "productionCountries" : String,
    "productionYear" : Number,
    "length" : Number,
    "description" : String,
    "director" : String,
    "actor" : String,
    "language" : String,
    "subtitle" : String,
    "premier" : Number,
    "trailer" : String,
    "image" : String,
    "review" : String
  });
  

  class filmClass{
    get age(){
      let currentYear = new Date().getFullYear();
      return currentYear - this.year;
    }
  }
  //Create the model and export it
  filmSchema.loadClass(filmClass);
  module.exports = db.model('Film', filmSchema);
  