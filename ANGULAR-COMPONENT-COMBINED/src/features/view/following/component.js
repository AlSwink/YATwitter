import templateUrl from './template.html'

console.log("loaded following")

export default angular.module('twitter.app')
.component('following', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database /*services controller needs access to*/){

    this.followingList = []

    if (Database.loggedIn.username !== '') {
      Database.getFollowing(Database.loggedIn.username)
        .then((data) => {
          this.followingList = data
          console.log(data)
        })
    }
  },
  controllerAs: 'ctrl'
})
