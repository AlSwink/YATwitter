import templateUrl from './template.html'

console.log("loaded userComponent")

export default angular.module('twitter.app')
.component('user', {
  templateUrl,
  controller: function(tweetService, Database, $scope, $state, color, $stateParams){
    console.log(this)

    let userId = $stateParams.userId

    this.flrList = []
    this.flgList = []
    this.tweetsList = []
    this.feedList = []
    this.user = {}
    this.mode = 'following'

    this.follow = (username) => {
      Database.follow(username, Database.loggedIn)
    }
    this.unfollow = (username) => {
      Database.unfollow(username, Database.loggedIn)
    }

    this.getRandomColor = (index) => color.getRandomColor(index)

    Database.getUser(userId)
      .then((data) => {
        this.user = data
      })

    Database.getFeed(userId)
      .then((data) => {
        this.feedList = data
      })
    Database.getTweets(userId)
      .then((data) => {
        this.tweetsList = data
      })
    Database.getFollowers(userId)
      .then((data) => {
        this.flrList = data
      })
    Database.getFollowing(userId)
      .then((data) => {
        this.flgList = data
      })

    this.setMode = (mode) => this.mode = mode

    this.showFollowers = () => {
      if(this.mode === 'followers'){
        return true
      } else return false
    }
    this.showFollowing = () => {
      if(this.mode === 'following'){
        return true
      } else return false
    }
    this.showFeed = () => {
      if(this.mode === 'feed'){
        return true
      } else return false
    }
    this.showTweets = () => {
      if(this.mode === 'tweets'){
        return true
      } else return false
    }
    this.like = (id) => {
      tweetService.likeTweet(id, Database.loggedIn)
        .then((data) => {
          console.log(data)
        })
    }

  },
  controllerAs: 'ctrl',
  bindings: {}
})
