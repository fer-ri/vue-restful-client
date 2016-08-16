module.exports = {
  ready () {
    if (!this.endPoint) {
      console.warn('endPoint API was not set')
    }
  },
  components: {
    RestTable: require('../ui/RestTable')
  },
  data () {
    return {
      creating: false,
      updating: false
    }
  },
  computed: {
    pathIndex () {
      return '/' + this.endPoint
    },
    pathCreate () {
      return this.pathIndex + '/create'
    }
  },
  methods: {
    formatDate (value, fmt = 'D MMM YYYY') {
      if (value == null) return ''

      return require('moment')(value, 'YYYY-MM-DD').format(fmt)
    },
    notify (name, args) {
      this.$broadcast(name, args)
      this.$dispatch(name, args)
    },
    reloadIndex () {
      this.$router.go({
        path: this.pathIndex,
        query: {
          t: (new Date()).getTime()
        }
      })
    },
    backToIndex () {
      this.$router.go({
        path: this.pathIndex
      })
    },
    store (item) {
      this.creating = true

      this.$http.post(this.endPoint, item)
        .then(response => {
          this.reloadIndex()

          this.notify('app:success', 'Item has been created')

          this.creating = false
        }, response => {
          this.notify('app:error', response)

          this.creating = false
        })
    },
    update (item) {
      this.updating = true

      this.$http.put(this.endPoint + '/' + item.uuid, item)
        .then(response => {
          this.reloadIndex()

          this.notify('app:success', 'Item has been updated')

          this.updating = false
        }, response => {
          this.notify('app:error', response)

          this.updating = false
        })
    },
    deleteItem (item) {
      this.$http.delete(this.endPoint + '/' + item.uuid)
        .then(response => {
          this.reloadIndex()
          this.notify('app:success', 'Item has been deleted')
        }, response => {
          this.notify('app:error', response)
        })
    }
  },
  events: {
    'rest-table:edit-item' (item) {
      this.$router.go({ path: item.uuid + '/edit', append: true })
    },
    'rest-table:delete-item' (item) {
      if (window.confirm('Delete item ?') === true) {
        this.deleteItem(item)
      }
    }
  },
  route: {
    canReuse: false
  }
}
