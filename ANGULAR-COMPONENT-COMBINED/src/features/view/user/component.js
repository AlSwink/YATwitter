import templateUrl from './template.html'

console.log("loaded userComponent")

export default angular.module('twitter.app')
.component('user', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope,$stateParams){
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let userId =$stateParams.userId
    let userFunction = $stateParams.function
    let usersBool = $stateParams.usersBool

    switch(userFunction) {
     case "follow":
         console.log("follow"+ " "+ userId)
         break
     case "unfollow":
        console.log("unfollow"+ " "+ userId)
        break
     case "tweets":
        console.log("tweets"+ " "+ userId)
        break
     case "feed":
        console.log("feed"+ " "+ userId)
        break
     case "mentions":
        console.log("mentions"+ " "+ userId)
        break
     case "followers":
        console.log("followers"+ " "+ userId)
        break
      case "following":
        console.log("following"+ " "+ userId)
        break
      default:
        console.log("NOT A FUNCTION"+ " "+ userId)
      }

    console.log(userId,userFunction,usersBool)
  },
  controllerAs: 'ctrl',
  bindings: {}
})
