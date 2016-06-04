'use strict';

require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('wordsApp'));

  var ResourceService;
  var $httpBackend;
  var wordsResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    wordsResource = ResourceService('words');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/words').respond(200, [{wordBody: 'test word', _id: 1}]);
    wordsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });
});
