import templateUrl from './template.html'

console.log("loaded profile")

export default angular.module('twitter.app')
.component('profile', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database, $stateParams /*services controller needs access to*/){
    let username = $stateParams.username

    this.emailRequired = false
    this.usernameRequired = false
    this.passwordRequired = false
    this.usernameTaken = false
    this.credentials = {
      username: '',
      password: ''
    }
    this.profile = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
    this.postUser = {
      credentials: {},
      profile: {},
      content: ''
    }
    this.user= {}

    this.deletedUser = {}

    this.registerClick = (username, password, firstName, lastName, email, phone) => {
      username === undefined ? this.usernameRequired = true : this.usernameRequired = false
      password === undefined ? this.passwordRequired = true : this.passwordRequired = false
      email === undefined ? this.emailRequired = true : this.emailRequired = false

      if (username !== undefined) {
        Database.checkAvailable(username)
          .then((data) => {
            if (data === false) {
              this.usernameTaken = true
            } else {
              this.usernameTaken = false
            }
          })
      }

      if (username !== undefined && password !== undefined && email !== undefined && this.usernameTaken !== true) {
        this.credentials = {username: username, password: password}
        this.profile = {firstName: firstName, lastName: lastName, email: email, phone: phone}
        this.postUser = {credentials: this.credentials, profile: this.profile, content: ''}
        Database.postUser(this.postUser)
          .then((data) => {
            if (data !== undefined) {
              this.user = data
            } else {
              console.log('post failed')
            }
          })
      }
    }

    this.getUser = (username) => {
      Database.getUser(username)
        .then((data) => {
          this.user = data
        })
    }

    this.updateUser = (firstName, lastName, email, phone) => {
      this.postUser.content = ''
      this.postUser.credentials = Database.loggedIn
      this.postUser.profile = {firstName: firstName, lastName: lastName, email: email, phone: phone}
      Database.patch(Database.loggedIn.username, this.postUser)
        .then((data) => {
          this.user = data
        })
    }

    this.deleteUser = () => {
      this.deletedUser = {
        content: '',
        credentials: Database.loggedIn,
        profile: {}
      }
      Database.deleteUser(Database.loggedIn.username, this.deletedUser)
        .then((data) => {
          console.log(data)
        })
    }

    this.isRegistered = () => {
      return (Database.loggedIn.username !== "")
    }

    this.getUser(username)
  },
  controllerAs: 'ctrl'
})

//because there is no array on the module here, angular will send us the module named
//twitter.app which was already declared in app.module.js and imported by main.js, which
//already ran by the time this is loading.

//main.js must import this script or the component will not be loaded!!
