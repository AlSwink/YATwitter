var app = angular.module('twitter.app');

console.log('++++++++++++++ui-router loaded')

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('tweet', {
    url: '/tweet/:tweetId/:function',
    params: { tweetId: null ,function:null },
    component: 'tweet',  //
    // template: '<h3>Regular Tweet </h3>'
  })

  $stateProvider.state('tweets', {
    url: '/tweets',         // Gets all the tweets and then displays them.
  //  component: 'tweet', // Goes to the tweet component or passes the new parameter
    template: '<h3>Get All Tweets</h3>'
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
