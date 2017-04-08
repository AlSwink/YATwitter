/* global $ */

import templateUrl from './template.html'

console.log("loaded feed")

export default angular.module('twitter.app')
.component('feed', {
  templateUrl,

  controller: function (Database, $scope, $stateParams, $state) {
    this.usersFeed = []

    Database.getFeed(Database.loggedIn.username)
      .then((data) => {
        this.usersFeed = data
      })

    this.clickUser = (username) => {
      $state.go('user', {userId: username})
    }
  },
  controllerAs: 'ctrl'
})
