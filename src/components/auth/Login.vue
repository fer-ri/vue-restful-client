<template lang="jade">
  .container
    .brand Vue Restful Client

    form(v-on:submit.prevent="onSubmit")
      .list-group
        .list-group-item
          input.form-control.input-sm(
            type="text", 
            placeholder="Email", 
            v-model="credentials.email",
            :disabled="submitting"
          )
        .list-group-item
          input.form-control.input-sm(
            type="password", 
            placeholder="Password", 
            v-model="credentials.password",
            :disabled="submitting"
          )

      button.btn.btn-lg.btn-primary.btn-block(
        type="submit", 
        :disabled="submitting",
        v-text="submitting ? 'Loading ..' : 'Sign in'"
      )

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
  import $ from 'jquery'
  
  export default {
    data () {
      return {
        submitting: false,
        credentials: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        let $this = this

        this.submitting = true

        this.$auth.login(this.credentials, true, '/', {
          success (user) {
            $this.submitting = false

            $('body').removeClass('auth-page')

            $this.$dispatch('app:success', 'Welcome back')
          },
          error (error) {
            $this.submitting = false

            console.log(error)

            $this.$dispatch('app:error', error)
          }
        })
      }
    },
    head: {
      title: {
        inner: 'Sign in'
      }
    }
  }
</script>