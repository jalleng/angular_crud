'use strict';

module.exports = function(app) {
  app.directive('style', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/directives/style_template.html',
      transclude: true,
      scope: {
        title: '@'
      }
    };
  });
};
