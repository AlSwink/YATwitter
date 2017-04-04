

angular.module('twitter.app')

.service('Database', function ($http) { //Database has access to http builtin service

  console.log('Database service created')
  console.log(this)
  $http({
    method:'GET',
    url: '' //I had trouble accessing Google, Google rejected my request. May need to add headers: key

  }).then(function successCallback(response){
    console.log('was able to access index.html')
  }, function errorCallback(response){
    console.log('http test failed, could not access index.html')
  })


})
