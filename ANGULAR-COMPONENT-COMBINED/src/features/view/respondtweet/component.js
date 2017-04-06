import templateUrl from './template.html'

console.log("loaded respondtweet")

export default angular.module('twitter.app')
.component('respondtweet', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database /*services controller needs access to*/){
    console.log(this)
    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.
  },
  controllerAs: 'ctrl',
  bindings: {}
})
