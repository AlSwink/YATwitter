import templateUrl from './template.html'

console.log("loaded searchboxwithlist")

let self001
export default angular.module('twitter.app')
.component('searchboxwithlist', {
  templateUrl, //comes from the import, installs into the templateUrl slot as if templateUrl: templateUrl

  controller: function(Database, $scope) {
    self001 = this

    const fakedata = true

    this.refresh = () => {
      if (fakedata) {
        if (this.menuState === 'people') {
          this.listdata = [
            {
              uname: 'UserEli',
              profile: {email: 'a@b.com', firstName: 'ELI', lastName: 'R', phone: '111-111-1111'},
              joined: 22222222444

            },
            {
              uname: 'UserBob',
              profile: {email: 'a@b.com', firstName: 'Bob', lastName: 'R', phone: '111-111-1111'},
              joined: 22222222444

            },
            {
              uname: 'DudeUser',
              profile: {email: 'a@b.com', firstName: 'Erv', lastName: 'R', phone: '111-111-1111'},
              joined: 22222222444


            },
            {
              uname: 'UserGwen',
              profile: {email: 'a@b.com', firstName: 'Gwen', lastName: 'R', phone: '111-111-1111'},
              joined: 22222222444


            },
            {
              uname: 'UserBigJerry',
              profile: {email: 'a@b.com', firstName: 'Jerry', lastName: 'R', phone: '111-111-1111'},
              joined: 22222222444


            }]
        }
        else if (this.menuState === 'tags') {
          this.listdata = [
            {
              label: 'BoomTag',
              firstUsed: 111111111,
              lastUsed: 222222222
            },
            {
              label: 'WooshTag',
              firstUsed: 11111551111,
              lastUsed: 11111333551111

            },
            {
              label: 'YoyoyoyoyoTag',
              firstUsed: 11112211111,
              lastUsed: 1111778611111

            }]
        }
      }
      else //data is not fake
      {

        if (this.menuState === 'people') {
          this.listdata = Database.getAllUsers()
        }
        else if (this.menuState === 'tags') {
          this.listdata = Database.getAllTags()
        }

      }

      this.listdata.forEach((item) => {
        if (item.tilecolor === undefined)
        {
          item.tilecolor = getRandomColor()
        }
      })
    }

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

const getRandomColor = () => {
  //return 'lightgreen'
    return COLORS[Math.floor(Math.random() * COLORS.length)]
}

const COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
