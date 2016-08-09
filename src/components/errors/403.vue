<template lang="jade">
  .container.container-403
    .text-center
      h1 403
      h3 You are not authorized to access this resource.
      p
        a.btn.btn-lg.btn-primary(v-link="{ path: '/' }") Back to home
</template>

<script>
  import $ from 'jquery'

  export default {
    head: {
      title: {
        inner: '403'
      }
    },
    ready () {
      $('.container-403').css('height', $(window).height())
    }
  }
</script>

<style lang="sass" scoped>
  h1, h3
    font-weight: 300;

  h1
    font-size: 6em;

  .container-403
    display: flex;
    align-items: center;
    justify-content: center;

  a.btn
    margin-top: 30px;
</style>