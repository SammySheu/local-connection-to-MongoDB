const mongoose = require('mongoose') ;

const CharacterShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}) ;

const character = mongoose.model('characters', CharacterShema) ;

module.exports = character ;
