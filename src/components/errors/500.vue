<template lang="jade">
  .container.container-500
    .text-center
      h1 500
      h3 Whoops, looks like something went wrong.
      p
        a.btn.btn-lg.btn-primary(v-link="{ path: '/' }") Back to home
</template>

<script>
  import $ from 'jquery'

  export default {
    head: {
      title: {
        inner: '500'
      }
    },
    ready () {
      $('.container-500').css('height', $(window).height())
    }
  }
</script>

<style lang="sass" scoped>
  h1, h3
    font-weight: 300;

  h1
    font-size: 6em;

  .container-500
    display: flex;
    align-items: center;
    justify-content: center;

  a.btn
    margin-top: 30px;
</style>