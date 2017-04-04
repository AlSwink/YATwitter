

angular.module('twitter.app')

.service('Database', function ($http) { //Database has access to http builtin service

  console.log('Database service created')
  console.log(this)
  $http({
    method: 'GET',
    url: '' // I had trouble accessing Google, Google rejected my request. May need to add headers: key
  }).then(function successCallback (response) {
    console.log('was able to access index.html')
  }, function errorCallback (response) {
    console.log('http test failed, could not access index.html')
  })

  this.get = function (type) {
    $http({
      method: 'GET',
      url: '' // I had trouble accessing Google, Google rejected my request. May need to add headers: key
      //same origin requests?
    }).then(function successCallback (response) {
      console.log('SUCCESSFULLY CALLED METHOD')
    }, function errorCallback (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getAll = function (type) {
      //$http method here
      console.log ("called database getAll with " + type + " as type")
      if (type === 'people') {
        return ['Bob', 'Jerry', 'Adam', 'Samantha', 'Keesha', 'Amanda', 'Erv']
      }
      else if (type === 'hashtags') {
        return ['PortlandVirtues', 'leftofcenter', 'crazytown', 'somenonsense', 'whereisthechicken']
      }
      else {
        return []
      }
  }

})
