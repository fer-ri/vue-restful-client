<template lang="jade">
  .container
    .brand Vue Restful Client

    form(v-on:submit.prevent="onSubmit")
      .list-group
        .list-group-item
          input.form-control.input-sm(type="text", placeholder="Email", v-model="credentials.email")
        .list-group-item
          input.form-control.input-sm(type="password", placeholder="Password", v-model="credentials.password")

      button.btn.btn-lg.btn-primary.btn-block(type="submit") Sign in

    .forgot-password
      a Forgot password?

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

    .register
      p.text-center Do not have an account?
      a.btn.btn-default.btn-block.btn-lg(v-link="{ path: '/auth/register' }") Create an account
</template>

<style lang="sass" scoped>
  .form-control
    border: none;
    box-shadow: none;

  .forgot-password
    padding: 20px 0 0;
    text-align: center;
  
  .register
    padding: 20px 0;
</style>

<script>
  import { login } from '../../vuex/actions'

  export default {
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.$auth.login(this.credentials, true, '/', {
          success: function (user) {
            this.login(user)
          },
          error: function () {
            console.log('error')
          }
        })
      }
    },
    head: {
      title: {
        inner: 'Sign in'
      }
    },
    vuex: {
      actions: {
        login
      }
    }
  }
</script>