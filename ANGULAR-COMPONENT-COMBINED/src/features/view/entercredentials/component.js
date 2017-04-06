import templateUrl from './template.html'

export default angular.module('twitter.app')
.component('entercredentials', {
  templateUrl,
  controller: function (Database) {
    this.usernameTest = ''
    this.credentials = {
      username: '',
      password: ''
    }

    this.loginClick = (username, password) => {
      if (username !== undefined && password !== undefined) {
        this.credentials.username = username
        this.credentials.password = password
        console.log(this.credentials.username)
        Database.validate(this.credentials)
      }
    }

    this.registerClick = () => {
      console.log('register')
    }
  },
  controllerAs: 'ctrl'
})
