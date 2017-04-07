import templateUrl from './template.html'

console.log("loaded tagComponent")

export default angular.module('twitter.app')
.component('tag', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function($scope,$stateParams){
    console.log(this)

    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let tagId =$stateParams.tagId
    let tagsBool = $stateParams.tagsBool

    console.log(tagId,tagsBool)
  },
  controllerAs: 'ctrl',
  bindings: {}
})
