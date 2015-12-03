module.exports = function(app) {
  app.controller('WordsController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.words = [];
    $scope.newWord = {};
    var wordResource = Resource('words');
    $scope.description = 'An app that collects words! How Fun!';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function() {
      wordResource.getAll(function(err, data) {
        if (err) return console.log(err);
        $scope.words = data;
      });
    };

    $scope.createWord = function(word) {
      wordResource.create(word, function(err, data) {
        if(err) return console.log(err);
        $scope.newWord = '';
        $scope.words.push(data);

      });
    };

    $scope.beginUpdate = function(word) {
      word.old = word.wordBody;
      word.editing = true;
    };

    $scope.cancelUpdate = function(word) {
      word.wordBody = word.old;
      word.editing = false;
    };

    $scope.saveWord = function(word) {
      word.status = 'pending';
      wordResource.update(word, function(err) {
        word.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.removeWord = function(word) {
      word.status = 'pending';
      wordResource.remove(word, function(err) {
        if (err) return console.log(err);
        $scope.words.splice($scope.words.indexOf(word), 1);
      });
    };
  }]);
};
