<template lang="jade">
  .container
    .brand Vue Restful Client

    form
      .list-group
        .list-group-item
          input.form-control.input-sm(type="text", placeholder="Name")
        .list-group-item
          input.form-control.input-sm(type="text", placeholder="Email")
        .list-group-item
          input.form-control.input-sm(type="password", placeholder="Password")
        .list-group-item
          input.form-control.input-sm(type="password", placeholder="Confirm password")

      button.btn.btn-lg.btn-primary.btn-block(type="submit") Sign up

    .social-auth
      p No matter signed up, sign in quickly with

      .row
        .col-xs-4
          a.btn.btn-default.btn-block.btn-sm
            i.ti-facebook
            | Facebook
        .col-xs-4
          a.btn.btn-default.btn-block.btn-sm
            i.ti-twitter
            | Twitter
        .col-xs-4
          a.btn.btn-default.btn-block.btn-sm
            i.ti-google
            | Google

    .login
      p.text-center Already have an account?
      a.btn.btn-default.btn-block.btn-lg(v-link="{ path: '/auth/login' }") Sign in now
</template>

<style lang="sass" scoped>
  .login
    padding: 20px 0;
</style>

<script>
  export default {
    head: {
      title: {
        inner: 'Sign up'
      }
    },
    route: {
      activate (transition) {
        transition.next()
      },
      deactive (transition) {
        transition.next()
      }
    }
  }
</script>