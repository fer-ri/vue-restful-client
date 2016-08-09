<template lang="jade">
  .container.container-404
    .text-center
      h1 404
      h3 Page not found
      p
        a.btn.btn-lg.btn-primary(v-link="{ path: '/' }") Back to home
</template>

<script>
  import $ from 'jquery'

  export default {
    head: {
      title: {
        inner: '404'
      }
    },
    ready () {
      $('.container-404').css('height', $(window).height())
    }
  }
</script>

<style lang="sass" scoped>
  h1, h3
    font-weight: 300;

  h1
    font-size: 6em;

  .container-404
    display: flex;
    align-items: center;
    justify-content: center;

  a.btn
    margin-top: 30px;
</style>