import templateUrl from './template.html'

console.log("loaded tweetComponent")

export default angular.module('twitter.app')
.component('tweet', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope,$stateParams){
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let tweetId =$stateParams.tweetId
    let tweetFunction = $stateParams.function
    let tweetTweetsBool = $stateParams.tweetsBool

    // $scope.id = $stateParams.tweetId
    // $scope.function = $stateParams.function
    // $scope.tweetsBool = $stateParams.tweetsBool
    // console.log($stateParams.tweetsBool);

    switch(tweetFunction) {
     case "like":
         console.log("Like"+ " "+ tweetId)
         break
     case "reply":
        console.log("reply"+ " "+ tweetId)
        break
     case "repost":
        console.log("repost"+ " "+ tweetId)
        break
     case "tags":
        console.log("tags"+ " "+ tweetId)
        break
     case "getLikes":
        console.log("getLikes"+ " "+ tweetId)
        break
      case "context":
        console.log("context"+ " "+ tweetId)
        break
      case "replies":
        console.log("replies"+ " "+ tweetId)
        break
      case "getRepost":
        console.log("getRepost"+ " "+ tweetId)
        break
      case "mentions":
        console.log("mentions"+ " "+ tweetId)
        break
      default:
        console.log("NOT A FUNCTION"+ " "+ tweetId)
      }


    console.log(tweetId,tweetFunction,tweetTweetsBool)
  },
  controllerAs: 'ctrl',
  bindings: {}
})
