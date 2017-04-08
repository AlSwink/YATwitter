import templateUrl from './template.html'

console.log("loaded tweetComponent")

export default angular.module('twitter.app')
.component('tweet', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function(Database, tweetService, $scope, $stateParams) {
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    this.tweetId =$stateParams.tweetId
    this.tweetFunction = $stateParams.function
    this.tweetTweetsBool = $stateParams.tweetsBool
    this.tweetList = [];

    // $scope.id = $stateParams.tweetId
    // $scope.function = $stateParams.function
    // $scope.tweetsBool = $stateParams.tweetsBool
    if(this.tweetTweetsBool)
    {
      tweetService.getAllTweets()
        .then(function (data) {
          this.tweetList = data
          })
    }else {

    switch(this.tweetFunction) {
     case "tags":
        console.log("tags"+ " "+ this.tweetId)
        tweetService.getTags(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
     case "likes":
        console.log("getLikes"+ " "+ this.tweetId)
        tweetService.getLikes(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
      case "context":
        console.log("context"+ " "+ this.tweetId)
        tweetService.getContext(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
      case "replies":
        console.log("replies"+ " "+ this.tweetId)
        tweetService.getReplies(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
      case "repost":
        console.log("getRepost"+ " "+ this.tweetId)
        tweetService.getReposts(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
      case "mentions":
        console.log("mentions"+ " "+ this.tweetId)
        tweetService.getMentions(this.tweetId)
          .then(function (data) {
            this.tweetList = data
            })
        break
      default:
      console.log("id or not function"+ " "+ this.tweetId)
      tweetService.getTweet(this.tweetId)
        .then(function (data) {
          this.tweetList = data
          })
      }

      this.postTweet = (content, thisScope) => {
        tweetService.postTweet({credentials: Database.loggedIn, content: content})
          .then((data) => {
            console.log(data)
            thisScope.tweetcontent = ''
          })
      }

      this.loggedIn = () => {
        return (Database.loggedIn.username !== '')
      }
  },

  controllerAs: 'ctrl',
  bindings: {}
})
