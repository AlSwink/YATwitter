import templateUrl from './template.html'

console.log("loaded searchboxwithlist")

let self001
export default angular.module('twitter.app')
.component('searchboxwithlist', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database, $timeout, $q, $log) {
    self001 = this

    this.get = (type) => {
      console.log("trying to GET with type " + type)
      //Database.get(type);
    }

    this.setType = (type) => {
      this.type = type;
    }

    this.refresh = () => {
      this.listdata = ['dummy1', 'dummy2', 'dummy3', 'whatever', 'Alpha', 'Bravo', 'Delta', 'Echo', 'Foxtrot', '1', 'a', 'b']
       //Database.getAll(this.type)
    }

    //this.type = ''  this must be commented out b/c type arrives via the bindings
    //as a parameter from index.html. Uncommented, it is hidden or overwritten to ''
    this.item = 'some item'

    this.listdata = []

    this.searchEnabled = true

    this.sortByTrending = true

    this.sortByPeople = true

    this.sortByTags = true

    this.peopleSearchVisible = true

    this.tagSearchVisible = false

    this.menuState = 'people'

    this.isMenuState = (m) => m === this.menuState

    this.getMenuState = () => this.menuState

    this.getSearchEnabled = () => this.searchEnabled
    //complicated so that it is easy to add more states of visibility
    this.setMenuState = (m) => this.menuState = m

    this.toggleTagSearch = () => this.tagSearchVisible = !this.tagSearchVisible

    this.toggleSortByPeople = () => this.sortByPeople = !this.sortByPeople

    this.toggleSearchEnabled = () => {this.searchEnabled = !(this.getSearchEnabled()); console.log(this.searchEnabled.toString());}

    this.toggleByTrending = () => this.sortByTrending = !this.sortByTrending

    this.toggleVisible = () => this.toggleVisible = !this.toggleVisible



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
    this.refresh()
    //this.$onChanges = this.refresh()
    //this.somefunction = function(){}
    //goes here. functions that will be called by html through the bindings.
  },
  controllerAs: 'ctrl',
  bindings: {
    type: '@',
    item: '@'
  }
})

//because there is no array on the module here, angular will send us the module named
//twitter.app which was already declared in app.module.js and imported by main.js, which
//already ran by the time this is loading.

//main.js must import this script or the component will not be loaded!!
