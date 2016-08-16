module.exports = {
  methods: {
    notify (name, args) {
      this.$broadcast(name, args)
      this.$dispatch(name, args)
    },
    notifyError (args) {
      this.notify('app:error', args)
    },
    notifySuccess (args) {
      this.notify('app:success', args)
    }
  }
}
