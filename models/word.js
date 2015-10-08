var mongoose = require('mongoose');
var wordSchema = new mongoose.Schema({
  author: {type: String, default: 'Anonymous'},
  wordBody: String,
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
