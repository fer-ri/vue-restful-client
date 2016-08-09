<script>
  import { logout } from '../../vuex/actions'

  export default {
    route: {
      activate () {
        this.$auth.logout('/auth/login', true)

        this.logout()
      }
    },
    vuex: {
      actions: {
        logout
      }
    }
  }
</script>
