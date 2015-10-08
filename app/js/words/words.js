module.exports = function(app) {
  require('./controllers/words_controller')(app);
  require('./directives/word_form_directive')(app);
};
