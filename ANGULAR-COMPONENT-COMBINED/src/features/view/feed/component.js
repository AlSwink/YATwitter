import templateUrl from './template.html'

console.log("loaded feed")

const testTweet1 = {
  id: 9,
  author: 'Jon Grady',
  posted: '4/24/17',
  content: 'this is the content of testTweet'

}
const testTweet2 = {
  id: 9,
  author: 'Jon Grady',
  posted: '4/24/17',
  content: 'this is the content of testTweet'

}
const testTweet3 = {
  id: 9,
  author: 'Jon Grady',
  posted: '4/24/17',
  content: 'this is the content of testTweet'

}
const testTweet4 = {
  id: 9,
  author: 'Jon Grady',
  posted: '4/24/17',
  content: 'this is the content of testTweet'

}

export default angular.module('twitter.app')
.component('feed', {
  templateUrl,

  controller: function (Database, $scope, $stateParams) {
    this.usersFeed = []

    let stop = $interval(function () {
      console.log('interval')
    }, 100)

    Database.getFeed(Database.loggedIn.username)
      .then((data) => {
        this.usersFeed = data
        console.log('data')
        console.log(data)
      })
  },
  controllerAs: 'ctrl'
})
