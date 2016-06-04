'use strict';

module.exports = function(app) {
  app.directive('wordForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/words/directives/word_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        word: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    };
  });
};
