let app = new Vue({
  el: '#app',
  data: {
    editMode: false,
    frameworks: [
      { name: 'Wreck It Ralph', votes: 0 },
      { name: 'Bolt', votes: 0 },
      { name: 'Meet the Robinsons', votes: 0 }
    ]
  },
  //voting feature, lets us add +1 on a single click...
  methods: {
    voteFor: function(f) {
      f.votes += 1
      this.save()
    },
    //add a new element that will fit within the framework established in data...
    addNew: function(event) {
      this.frameworks.push({
        name: event.target.value,
        votes: 0
      })
      event.target.value = ''
      this.save()
    },
    //delete a specific li, populated next to a given element...
    remove: function(f) {
      this.frameworks = this.frameworks.filter(i => i != f)
      this.save()
    },
    //persists data on the browser...
    load: function() {
      let data = localStorage.getItem('saved')
      if (data) {
        this.frameworks = JSON.parse(data)
      }
    },
    save: function() {
      let data = JSON.stringify(this.frameworks)
      localStorage.setItem('saved', data)
    },
    //hide elements until cilcked on...
    toggleEditMode: function() {
      this.editMode = !this.editMode
    }
  },
  //compute the current winner, by recognizing the number of votes, find the
  //largest number, and return that current winner...
  computed: {
    winnerString: function() {
      let scores = this.frameworks.map(f => f.votes)
      let highscore = Math.max.apply(Math, scores)
      let bestList = this.frameworks.filter(f => f.votes == highscore)
      let bestNames = bestList.map(f => f.name)
      return bestNames.join(', ')
    }
  },
  created: function() {
    this.load()
  }
})
