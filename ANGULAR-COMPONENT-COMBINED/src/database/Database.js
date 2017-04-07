angular.module('twitter.app')

.service('Database', function ($http) { //Database has access to http builtin service

  const db = this
  this.loggedIn = {
    username: "",
    password: ""
  }

  this.getCredentials = () => { return this.loggedIn }

  this.setCredentials = (cred) => { this.loggedIn = cred }

  this.validateUser = (cred) => {
    console.log(cred.username)
    return $http.post(`http://localhost:8080/api/validate/username/credentials/@${cred.username}`, JSON.stringify(cred))
      .then(function success(response) {
        return response.data
      })
  }

  this.checkAvailable = (username) => {
    return $http.get(`http://localhost:8080/api/validate/username/available/@${username}`)
      .then(function success(response){
        return response.data
      })
  }

  this.checkExists = (username) => {
    return $http.get(`http://localhost:8080/api/validate/username/exists/@${username}`)
      .then(function success(response){
        return response.data
      })
  }

  this.getUser = function (username) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}`
    }).then(function successCallback (response) {
      return response.data
    }, function errorCallback (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getAllUsers = function () {
    return $http.get('http://localhost:8080/api/users')
     .then(function success (response) {
       return response.data
     }, function error (response) {
       console.log('FAILED TO GET RETURN FROM METHOD')
     })
  }

  this.postUser = function (postedUser) {
    return $http.post('http://localhost:8080/api/users/', JSON.stringify(postedUser))
      .then(function success (response) {
        db.loggedIn = postedUser['credentials']
        return response.data
      })
  }

  this.deleteUser = function (deletedUser, credentials) {
    return $http({
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
    return $http({
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
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/feed`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getTweets = function (username) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/tweets`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getMentions = function (username) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/mentions`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getFollowers = function (username) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/followers`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getFollowing = function (username) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/@${username}/following`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getAllTags = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/tags'
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

  this.getTag = function (label) {
    return $http({
      method: 'GET',
      url: `http://localhost:8080/api/users/${label}`
    }).then(function success (response) {
      return response.data
    }, function error (response) {
      console.log('FAILED TO GET RETURN FROM METHOD')
    })
  }

})
