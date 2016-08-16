<template lang="jade">
  h2.page-title Create User

  form(v-on:submit.prevent="store(user)")
    .form-group
      label Name
      input.form-control(required, v-model="user.name", :disabled="creating")
    .form-group
      label Email
      input.form-control(required, type="email", v-model="user.email", :disabled="creating")
    .form-group
      label Password
      input.form-control(required, type="password", v-model="user.password", :disabled="creating")
    .form-group
      label Role
      select.form-control(required, v-model="user.role", :disabled="creating")
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

  export default {
    mixins: [crud],
    data () {
      return {
        endPoint: 'users',
        user: {
          name: '',
          email: '',
          password: '',
          role: ''
        }
      }
    }
  }
</script>