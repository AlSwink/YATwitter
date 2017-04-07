import templateUrl from './template.html'

console.log("loaded following")

export default angular.module('twitter.app')
.component('following', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database /*services controller needs access to*/){
    const flwngCtrl = this

    this.followingList = []

    Database.getFollowing('Eli')
      .then(function (data) {
        data.forEach(function(element){
          flwngCtrl.followingList.push(element)
        })
      })

  },
  controllerAs: 'ctrl',
  bindings: {}
})

//because there is no array on the module here, angular will send us the module named
//twitter.app which was already declared in app.module.js and imported by main.js, which
//already ran by the time this is loading.

//main.js must import this script or the component will not be loaded!!
