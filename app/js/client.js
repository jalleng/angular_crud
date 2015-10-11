require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var wordsApp = angular.module('wordsApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(wordsApp);
//require('./filters/filters')(wordsApp);
require('./directives/directives')(wordsApp);
require('./words/words')(wordsApp);
require('./users/users')(wordsApp);
require('./logout')(wordsApp);
require('./router')(wordsApp);










