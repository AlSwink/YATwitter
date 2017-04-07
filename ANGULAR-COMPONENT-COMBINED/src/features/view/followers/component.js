import templateUrl from './template.html'

console.log("loaded followers")

export default angular.module('twitter.app')
.component('followers', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database /*services controller needs access to*/){
    const flwrCtrl = this

    this.followerList = []

    Database.getFollowers('string')
      .then(function (data) {
        data.forEach(function(element){
          flwrCtrl.followerList.push(element)
        })
      })
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
