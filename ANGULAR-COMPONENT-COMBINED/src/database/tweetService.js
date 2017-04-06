angular.module('twitter.app')
.service('tweetService', function ($http) {
  this.getAllTweets = function () {
    return $http.get('http://localhost:8080/api/tweets')
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getTweet = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/@${id}`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.postTweet = function (postedTweet) {
    return $http.post('http://localhost:8080/api/tweets', JSON.stringify(postedTweet))
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.deleteTweet = function (deleteId, credentials) {
    return $http.delete(`http://localhost:8080/api/tweets/${deleteId}`, JSON.stringify(credentials))
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.rePostTweet = function (id, rePostedTweet) {
    return $http.post(`http://localhost:8080/api/tweets/${id}/repost`, JSON.stringify(rePostedTweet))
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.replyTweet = function (id, replyTweet) {
    return $http.post(`http://localhost:8080/api/tweets/${id}/reply`, JSON.stringify(replyTweet))
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.likeTweet = function (id, credentials) {
    return $http.post(`http://localhost:8080/api/tweets/${id}/like`, JSON.stringify(credentials))
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getLikes = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/likes`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getMentions = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/mentions`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getContext = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/context`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getReposts = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/reposts`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getReplies = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/replies`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }

  this.getTags = function (id) {
    return $http.get(`http://localhost:8080/api/tweets/${id}/tags`)
      .then(function success (response) {
        console.log(response.data[0])
      })
  }
})
