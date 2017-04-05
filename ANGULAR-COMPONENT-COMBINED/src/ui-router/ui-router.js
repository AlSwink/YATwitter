var app = angular.module('twitter.app');

console.log('++++++++++++++ui-router loaded')

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('tweet', {
    url: '/tweet',
  //  component: 'tweetComponent',
    template: '<h3>TWEET</h3>'
  })

  $stateProvider.state('feed', {
    url: '/feed',
    //component: 'feedComponent',
    template: '<h3>FEED</h3>'
  })

  $stateProvider.state('following', {
    url: '/following',
    //component: 'feedComponent',
    template: '<h3>FOLLOWING</h3>'
  })

  $stateProvider.state('followers', {
    url: '/followers',
    //component: 'feedComponent',
    template: '<h3>FOLLOWERS</h3>'
  })

  $stateProvider.state('account', {
    url: '/account',
    //component: 'feedComponent',
    template: '<h3>ACCOUNT</h3>'
  })

}])
