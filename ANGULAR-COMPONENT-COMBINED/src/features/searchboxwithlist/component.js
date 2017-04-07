import templateUrl from './template.html'

//$state.go('tweet')

console.log("loaded searchboxwithlist")

let self001

export default angular.module('twitter.app')
.component('searchboxwithlist', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database, color, $state, $scope) {
    self001 = this

    const fakedata = false

    this.refresh = () => {
      if (fakedata) {
        if (this.menuState === 'people') {
          this.listdata = ['Eli', 'Bob', 'Jimmy', 'Anna']
        }
        else if (this.menuState === 'tags') {
          this.listdata = ['Tagtagtag', 'sometag','freedom','whatthe?']
        }
      }
      else //data is not fake
      {

        if (this.menuState === 'people') {
          Database.getAllUsers()
            .then(function (data) {
              const unameList = []
              data.forEach(function (element) {
                unameList.push(element.uname)
              })
              self001.listdata = unameList

            })
        }
        else if (this.menuState === 'tags') {
          Database.getAllTags()
            .then(function (data) {
              const tagList = []
              data.forEach(function (element) {
                tagList.push(element.label)
              })
              self001.listdata = tagList
            })
        }

      }
    }

    this.getUser = (user) => $state.go('user',{userId: user})

    this.item = ''

    //this.type is passed in via parent scope

    this.listdata = []

    this.searchEnabled = false

    this.sortType = ''

    this.peopleSearchVisible = true

    this.tagSearchVisible = false

    this.menuState = 'people'

    this.isMenuState = (m) => m === this.menuState

    this.getMenuState = () => this.menuState

    this.getSearchEnabled = () => this.searchEnabled

    this.getSort = () => this.sortType

    this.setMenuState = (m) => { this.menuState = m; this.refresh() }

    this.getRandomColor = (index) => {return color.getRandomColor(index)}

    this.setSort = (s) => {
      if (s === 'trending' && this.menuState === 'people') {
        this.sortType = ''
      }
      else if (s === 'creation' && this.menuState === 'people')
      {
        this.sortType = 'item.joined'
      }
      else if (s === 'name' && this.menuState === 'people')
      {
        this.sortType = 'item.lastName'
      }
      else if (s === 'trending' && this.menuState === 'tags')
      {
        this.sortType = 'item.lastUsed'
      }
      else if (s === 'creation' && this.menuState === 'tags')
      {
        this.sortType = 'item.firstUsed'
      }
      else if (s === 'name' && this.menuState === 'tags')
      {
        this.sortType = 'item.label'
      }
      this.refresh()
    }

    this.setTrendingSort = () => this.sortByPeople = !this.sortByPeople

    this.toggleSearchEnabled = () => { this.searchEnabled = !(this.getSearchEnabled()) }

    this.toggleByTrending = () => this.sortByTrending = !this.sortByTrending

    this.toggleVisible = () => this.toggleVisible = !this.toggleVisible


    /*
    this.new = function(item){
      if (type === 'hashtags')
      {
        console.log('IMPLEMENT CREATE NEW HASHTAG FROM SEARCH BAR')
      }
      else if (type === 'people')
      {
        console.log('IMPLEMENT CREATE NEW HASHTAG FROM SEARCH BAR')
      }
      else {
        console.log('searchbox type error! Received: ' + type)
      }
    }
    */
    this.refresh()
    //this.$onChanges = this.refresh()
    //this.somefunction = function(){}
  },
  controllerAs: 'ctrl',
  bindings: {
    type: '@',
    item: '@'
  }
})
