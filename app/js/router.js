module.exports = function(wordsApp) {
  wordsApp.config(['$routeProvider', function($route) {
    $route
      .when('/words', {
        templateUrl: '/templates/words/views/words_view.html',
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: "SigninController"
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
