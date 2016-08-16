<template lang="jade">
  router-view
</template>

<script>
  import _ from 'lodash'
  import store from './vuex/store'
  import Notification from './components/ui/Notification'

  export default {
    methods: {
      parsingError (error) {
        if (typeof error === 'string') {
          return error
        }

        if (typeof error === 'object') {
          if (_.get(error, 'data.errors')) {
            return _.flatten(_.toArray(error.data.errors)).join('<br />')
          }

          if (_.get(error, 'data.message')) {
            return error.data.message
          }

          if (_.get(error, 'statusText') && error.statusText !== '') {
            return error.statusText
          }
        }

        return 'An error occured'
      }
    },
    events: {
      'app:success' (message) {
        message = typeof message === 'string' ? message : 'Success'

        console.log(message)

        Notification({
          type: 'success',
          message
        })
      },
      'app:error' (message) {
        message = this.parsingError(message)

        console.log(message)

        Notification({
          type: 'error',
          message
        })
      }
    },
    store
  }
</script>

<style lang="sass">
  @import "~assets/scss/app";
</style>
