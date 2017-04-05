angular.module('twitter.app')

.service('Database', function ($http) { //Database has access to http builtin service

  console.log('Database service created')
  console.log(this)

  $http({
    method: 'GET',
    url: 'http://localhost:8080/api/users'
  }).then(function successCallback (response) {
    console.log('was able to access index.html')
    console.log('SUCCESSFULLY CALLED METHOD')
    const data = response.data
    data.forEach(function(element){
      console.log(element)
    })

  }, function errorCallback (response) {
    console.log('http test failed, could not access index.html')
  })

  this.getUser = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}`
    }).then(function successCallback (response) {
      const data = response.data[0]
      console.log(data.uname)
    }, function errorCallback (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getAllUsers = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/api/users'
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.postUser = function (postedUser) {
    $http.post('http://localhost:8080/api/users/', JSON.stringify(postedUser))
      .then(function success (response) {
        console.log(response.data)
      })
  }

  this.deleteUser = function (deletedUser, credentials) {
    $http({
      method: 'DELETE',
      url: `http://localhost:8080/api/users/@${deletedUser}`,
      data: JSON.stringify(credentials)
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log(response.data)
    })
  }

  this.patch = function (patchedUser) {
    $http({
      method: 'PATCH',
      url: `http://localhost:8080/api/users/@${patchedUser}`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log(response.data)
    })
  }
  this.follow = function (followed, credentials) {
    $http.post(`http://localhost:8080/api/users/@${followed}/follow`, JSON.stringify(credentials))
      .then(function success (response) {
        console.log(response.data)
      })
  }
  this.unfollow = function (unfollowed, credentials) {
    $http.post(`http://localhost:8080/api/users/@${unfollowed}/follow`, JSON.stringify(credentials))
      .then(function success (response) {
        console.log(response.data)
      })
  }
  this.getFeed = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/feed`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getTweets = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/tweets`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getMentions = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/mentions`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getFollowers = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/followers`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getFollowing = function (username) {
    $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/following`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

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
})
