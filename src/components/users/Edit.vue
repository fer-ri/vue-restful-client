<template lang="jade">
  h2.page-title Edit User

  template(v-if="!$loadingRouteData")
    form(v-on:submit.prevent="update(user)")
      .form-group
        label Name
        input.form-control(required, v-model="user.name", :disabled="updating")
      .form-group
        label Email
        input.form-control(required, type="email", v-model="user.email", :disabled="updating")
      .form-group
        label Password
        input.form-control(type="password", v-model="user.password", :disabled="updating")
        span.help-block Leave it blank to keep old password
      .form-group
        label Role
        select.form-control(required, v-model="user.role", :disabled="updating")
          option(value="member") Member
          option(value="operator") Operator
          option(value="admin") Admin

      .pull-right
        button.btn.btn-default(type="button", v-on:click="backToIndex") Back
        span &nbsp;
        button.btn.btn-info(type="submit") Submit
</template>

<style lang="sass">
  
</style>

<script>
  import crud from '../mixins/crud'
  import notify from '../mixins/notify'

  export default {
    mixins: [crud, notify],
    data () {
      return {
        endPoint: 'users',
        user: null
      }
    },
    route: {
      data (transition) {
        this.$http.get(this.endPoint + '/' + this.$route.params.uuid)
          .then(response => {
            transition.next({
              user: response.data.data
            })
          }, response => {
            this.notify('app:error', response)
          })
      }
    }
  }
</script>