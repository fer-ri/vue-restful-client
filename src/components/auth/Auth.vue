<template lang="jade">
  <router-view></router-view>

  .container
    .copyright
      p
        small.text-muted
          | Build with &hearts; by Ferri.
          br
          | Copyright &copy; 2016. &nbsp;All rights reserved.
</template>

<style lang="sass">
  body.auth-page
    background-color: #f1f3f6;

    .container
      width: 360px;
      padding-bottom: 40px;

    .brand
      font-size: 2em;
      text-align: center;
      padding: 80px 0 40px;

    .form-control
      border: none;
      box-shadow: none;

    .social-auth
      padding: 40px 0 20px;
      text-align: center;

      [class^="col-"]
        padding-left: 10px;
        padding-right: 10px;

        &:first-child
          padding-left: 15px;

        &:last-child
          padding-right: 15px;

      a > i
        margin-right: 10px;

</style>

<style lang="sass" scoped>
  .copyright
    margin-top: 30px;
    text-align: center;
</style>

<script>
  import $ from 'jquery'

  export default {
    route: {
      activate (transition) {
        $('body').addClass('auth-page')

        transition.next()
      },
      deactive (transition) {
        $('body').removeClass('auth-page')

        transition.next()
      }
    }
  }
</script>