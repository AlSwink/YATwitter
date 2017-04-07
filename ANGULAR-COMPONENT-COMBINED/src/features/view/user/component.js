import templateUrl from './template.html'

console.log("loaded userComponent")

export default angular.module('twitter.app')
.component('user', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope, $state, $stateParams){
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let userId = $stateParams.userId
    let userFunction = $stateParams.function
    let usersBool = $stateParams.usersBool

    this.users = []
    this.mode = 'none'
    switch(userFunction) {
     case "follow":
         console.log("follow"+ " "+ userId)
         Database.follow(userId, Database.getCredentials())
         break
     case "unfollow":
        console.log("unfollow"+ " "+ userId)
        Database.unfollow(userId, Database.getCredentials())
        break
     case "users":
       Database.getAllUsers()
         .then( (data) => {
           const userList = []
           data.forEach(function (element) {
             userList.push(element)
           })
           this.listdata = users

         })
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
