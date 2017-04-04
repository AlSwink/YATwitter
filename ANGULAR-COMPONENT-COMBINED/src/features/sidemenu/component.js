import templateUrl from './template.html'


// WARNING, AT TIME OF THIS WRITING, SIDEMENU REFUSES TO LOAD ITS HTML

console.log("loaded sidemenu")

export default angular.module('twitter.app')
.component('sidemenu', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl
  transclude: true,
  controller: function(Database /*services controller needs access to*/){
    console.log(this)
    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.
  },
  controllerAs: 'ctrl',
  bindings: {}
})

//because there is no array on the module here, angular will send us the module named
//twitter.app which was already declared in app.module.js and imported by main.js, which
//already ran by the time this is loading.

//main.js must import this script or the component will not be loaded!!
