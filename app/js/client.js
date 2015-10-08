require('angular/angular');
//require('angular-route');

var angular = window.angular;
var wordsApp = angular.module('wordsApp', []);

require('./services/services')(wordsApp);
require('./directives/directives')(wordsApp);
require('./words/words')(wordsApp);

// wordsApp.config(['$routeProvider', function($route){
//   $route
//     .when('/words', {
//       templateURL:'/templates/words/views/words_view.html',
//       controller:'WordsController'
//     })
//     .otherwise({
//       redirestcTo: '/words'
//     });
// }]);




