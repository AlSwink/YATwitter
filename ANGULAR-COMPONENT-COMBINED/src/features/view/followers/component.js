import templateUrl from './template.html'

console.log("loaded followers")

export default angular.module('twitter.app')
.component('followers', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database /*services controller needs access to*/){

    this.followerList = []

    if (Database.loggedIn.username !== '') {
      Database.getFollowers(Database.loggedIn.username)
        .then((data) => {
          this.followerList = data
          console.log(data)
        })
    }
  },
  controllerAs: 'ctrl'
})
