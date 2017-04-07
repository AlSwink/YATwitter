import templateUrl from './template.html'

console.log("loaded tweetdisplayComponent")

export default angular.module('twitter.app')
.component('tweetDisplay', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($stateParams){

  },
  controllerAs: 'ctrl',
  bindings: {}
})
