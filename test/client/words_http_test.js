'use strict';

require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('words controller', function() {
  var $httpBackend;
  var $ControllerConstructer;
  var $scope;

  beforeEach(angular.mock.module('wordsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructer = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructer('WordsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.words)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructer('WordsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/words').respond(200, [{wordBody: 'test word'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.words[0].wordBody).toBe('test word');
    });

    it('should be able to create a word', function() {
      $httpBackend.expectPOST('/api/words', {wordBody: 'send a test word'}).respond(200, {_id: 1, wordBody: 'test word'});
      $scope.newWord = {wordBody: 'hello'};
      $scope.createWord({wordBody: 'send a test word'});
      $httpBackend.flush();
      expect($scope.words[0].wordBody).toBe('test word');
      expect($scope.newWord).toBe(null);
    });

  });
});
