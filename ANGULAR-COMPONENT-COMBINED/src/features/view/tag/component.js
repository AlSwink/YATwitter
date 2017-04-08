import templateUrl from './template.html'

console.log("loaded tagComponent")

export default angular.module('twitter.app')
.component('tag', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  //controller: function(Database /*services controller needs access to*/){
  controller: function(Database, color, $scope, $stateParams){
    this.tagsList = {}
    this.singleTag = {}
    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.

    let tagId =$stateParams.tagId
    let tagsBool = $stateParams.tagsBool
    if(tagsBool){
      Database.getAllTags()
        .then((data) => {
          this.tagsList = data
        })
    } else {
      Database.getTag(tagId)
        .then((data) => {
          this.tagsList = data
        })
    }

    this.multiTag = () => {
      return tagsBool
    }

  },
  controllerAs: 'ctrl',
  bindings: {}
})
