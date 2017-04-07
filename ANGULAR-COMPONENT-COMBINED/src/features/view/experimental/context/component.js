import templateUrl from './template.html'

console.log("loaded contextComponent")


export default angular.module('twitter.app')
.component('context', {
  templateUrl,
  controller: function (tweetService, color, $stateParams){
    this.$onInit = () => {

    }

    const testtweet1 = {id: '01', author: 'testauthor', posted: '1000', content: 'test content'}
    const testtweet2 = {id: '02', author: 'testauthor2', posted: '10002', content: 'MORE content'}
    const testtweet3 = {id: '01', author: 'testauthor', posted: '1000', content: 'test content'}
    const testtweet4 = {id: '02', author: 'testauthor2', posted: '10002', content: 'MORE content'}
    const testtweet5 = {id: '01', author: 'testauthor', posted: '1000', content: 'test content'}
    const testtweet6 = {id: '02', author: 'testauthor2', posted: '10002', content: 'MORE content'}

    this.tweetId = $stateParams.tweetId

    this.context = {target: 'test', before: [testtweet2, testtweet1, testtweet3, testtweet4, testtweet5, testtweet6], after: [testtweet2, testtweet1, testtweet3, testtweet4, testtweet5, testtweet6]}

    tweetService.getContext(this.tweetId)
      .then((data) => {
        this.context = data
      })

      this.getRandomColor = (index) => {return color.getRandomColor(index)}

      this.getRandomBlue = (index) => {return color.getRandomBlue(index)}

      this.getRandomRed = (index) => color.getRandomRed(index)

      this.getRandomGreen = (index) => color.getRandomGreen(index)

  },
  controllerAs: 'ctrl',
  bindings: {}
})
