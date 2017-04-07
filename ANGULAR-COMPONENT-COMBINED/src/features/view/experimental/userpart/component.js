import templateUrl from './template.html'

console.log("loaded userpartComponent")

export default angular.module('twitter.app')
.component('userpart', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope,$stateParams){

  },
  controllerAs: 'ctrl',
  bindings: {}
})
