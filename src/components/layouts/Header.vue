<template lang="jade">
  #header
    #logo.light-version
      span
        | VUE RESTFUL CLIENT
    nav(role='navigation')
      .header-link.hide-menu(v-on:click='toggleSidebar')
        i.ti-menu
      .small-logo
        span.text-primary APP NAME
      .mobile-menu
        button.navbar-toggle.mobile-menu-toggle(type='button', data-toggle='collapse', data-target='#mobile-collapse')
          i.fa.fa-chevron-down
        #mobile-collapse.collapse.mobile-navbar
          ul.nav.navbar-nav
            li
              a(href='#') Link
            li
              a(href='#') Link
      .navbar-right
        ul.nav.navbar-nav
          li
            a(v-link="{ path: '/auth/logout' }")
              i.ti-power-off
</template>

<style lang="sass" scoped>
  @import "~assets/scss/bootstrap/variables";

  #header
    background-color: #fff;
    display: block;
    height: 56px;
    margin: 0;
    padding: 0;
    position: relative;
    border-bottom: 1px solid $border-color;

  #logo
    float: left;
    width: $menu-width;
    background-color: $color-bright;
    padding: 18px 10px 18px 18px;
    height: 56px;
    text-align: center;
    border-bottom: 1px solid $border-color;

    span
      font-weight: 600;
      color: $color-navy-blue;

  .header-link
    padding: 18px 26px;
    font-size: 14px;
    float: left;
    border-right: 1px solid $border-color;
    border-left: 1px solid $border-color;
    margin-right: 15px;
    background: $color-bright;
    cursor: pointer;

    &:hover
      background: darken($color-bright,2%);

  .small-logo
    display: none;
    text-align: center;
    padding-top: 18px;
    font-size: 14px;
    font-weight: 800;

  .navbar-nav 
    & > li > a
      color: $color-navy-blue;
      padding: 18px 20px 16px;

      i
        font-size: 1.2em;
  
  @media (min-width: 768px)
    .navbar-right
      margin-right: 0;
</style>

<script>
  import $ from 'jquery'

  export default {
    methods: {
      toggleSidebar () {
        if ($(window).width() < 769) {
          $('body').toggleClass('show-sidebar')
        } else {
          $('body').toggleClass('hide-sidebar')
        }
      }
    }
  }
</script>