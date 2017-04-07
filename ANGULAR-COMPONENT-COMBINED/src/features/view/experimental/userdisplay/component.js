import templateUrl from './template.html'

console.log("loaded userdisplayComponent")

export default angular.module('twitter.app')
.component('userDisplay', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope,$stateParams){
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let tweetId
    let tweetFunction
    let tweetTweetsBool

    $scope.id = $stateParams.tweetId
    $scope.function = $stateParams.function
    $scope.tweetsBool = $stateParams.tweetsBool

    if($scope.id != null){
        tweetId = $scope.id
        tweetFunction = $scope.function
        tweetTweetsBool = $scope.tweetTweetsBool
      }
        else {
          tweetId = "null"
        }

    console.log(tweetId,tweetFunction,tweetTweetsBool)
  },
  controllerAs: 'ctrl',
  bindings: {}
})
