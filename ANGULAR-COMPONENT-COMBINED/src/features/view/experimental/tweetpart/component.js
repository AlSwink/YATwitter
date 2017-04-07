import templateUrl from './template.html'

console.log("loaded tweetpartComponent")

export default angular.module('twitter.app')
.component('tweetpart', {
  templateUrl,

  controller: function (Database, color) {

    this.color = color.getRandomColor()

    this.color2 = color.getRandomColor()

    // this.tweetId

    this.tweet = {id: 0, author: 'test', posted: '000', content: 'test content'}

    this.refresh = () => {
      this.tweet.id = this.tweetId
    }

    this.$onInit = this.refresh

  },
  controllerAs: 'ctrl',
  bindings: {
    tweetId: '='
  }
})
