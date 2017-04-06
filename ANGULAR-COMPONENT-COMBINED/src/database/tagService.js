angular.module('twitter.app')
  .service('tagService', function ($http) {
    this.getAllTags = function () {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/api/tags'
      }).then(function success (response) {
        return response.data
      }, function error (response) {
        console.log('FAILED TO GET RETURN FROM METHOD')
      })
    }

    this.getTag = function (label) {
      $http({
        method: 'GET',
        url: `http://localhost:8080/api/users/${label}`
      }).then(function success (response) {
        return response.data
      }, function error (response) {
        console.log('FAILED TO GET RETURN FROM METHOD')
      })
    }

    this.validateTag = function (label) {
      $http.get(`http://localhost:8080/api/validate/tag/exists/@${label}`)
        .then(function success (response) {
          return response.data
        }, function errorCallback (response) {
          console.log('FAILED TO GET RETURN FROM METHOD')
        })
    }
  })
