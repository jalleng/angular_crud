require('angular/angular');

var angular = window.angular;
var wordsApp = angular.module('wordsApp', []);

require('./services/services')(wordsApp);
require('./directives/directives')(wordsApp);
require('./words/words')(wordsApp);






