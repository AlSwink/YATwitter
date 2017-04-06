var app = angular.module('twitter.app');

console.log('ui-router loaded')

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('tweet', {
    url: '/tweet/:tweetId/:function',
    params: { tweetId: null ,function:null, tweetsBool:false },
    component: 'tweet'
  })

  $stateProvider.state('tweets', {
    url: '/tweets',         // Gets all the tweets and then displays them.
    params: { tweetsBool: true },
    component: 'tweet' // Goes to the tweet component or passes the new parameter

    //template: '<h3>Get All Tweets</h3>'
  })

  $stateProvider.state('feed', {
    url: '/feed',
    component: 'feed'
  })

  $stateProvider.state('following', {
    url: '/following',
    component: 'following'
  })

  $stateProvider.state('followers', {
    url: '/followers',
    component: 'followers'
  })

  $stateProvider.state('account', {
    url: '/account',
    component: 'profile',
  })

}])
