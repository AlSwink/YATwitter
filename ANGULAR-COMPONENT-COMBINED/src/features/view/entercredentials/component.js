import templateUrl from './template.html'

export default angular.module('twitter.app')
.component('entercredentials', {
  templateUrl,
  controller: function (Database) {
    this.notLoggedIn = true
    this.notRegistered = false
    this.credentials = {
      username: '',
      password: ''
    }

    this.loginClick = (username, password) => {
      if (username !== undefined && password !== undefined) {
        this.credentials.username = username
        this.credentials.password = password
        Database.validateUser(this.credentials)
          .then((data) => {
            if (data === true) {
              Database.loggedIn = this.credentials
              this.notLoggedIn = false
            } else {
              this.notRegistered = true
            }
          })
      }
    }

    this.registerClick = () => {
      console.log('register')
    }
  },
  controllerAs: 'ctrl'
})
