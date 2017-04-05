var app = angular.module('twitter.app');

console.log('++++++++++++++ui-router loaded')

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('tweet', {
    url: '/tweet',
    component: 'component'
  })

}])
