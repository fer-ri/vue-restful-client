<template lang="jade">
  aside#menu
    #navigation
      .profile-picture
        img(src="~assets/logo.png", class="img-circle")
        .stats-label.text-color
          span.profile-name {{ $auth.data.name }}
          //- .dropdown
          //-   a.dropdown-toggle(href='#', data-toggle='dropdown')
          //-     small.text-muted
          //-       | Links 
          //-       b.caret
          //-   ul.dropdown-menu.animated.flipInX.m-t-xs
          //-     li
          //-       a(href='#') Example link
          //-     li
          //-       a(href='#') Example link
      ul#side-menu.nav
        li(v-link-active)
          a(v-link="{ path: '/', exact: true }")
            span.nav-label Dashboard
            span.label.label-success.pull-right start
        li(v-link-active)
          a(v-link="{ path: '/hello' }")
            span.nav-label Hello
        li(v-link-active)
          a(href='#')
            span.nav-label Dropdown Menu
            span.ti-angle-right
          ul.nav.nav-second-level
            li
              a(href='#') Child menu
            li
              a(href='#') Child menu 2
</template>

<style lang="sass" scoped>
  @import "~assets/scss/bootstrap/variables";

  body.hide-sidebar #menu
    margin-left: -$menu-width;

  #menu
    width: $menu-width;
    bottom: 0;
    float: left;
    left: 0;
    position: absolute;
    top: 62px;
    transition: all 0.4s ease 0s;

  .profile-picture
    padding: 20px 20px;
    text-align: center;

    img
      border-radius: 50%;
      margin-bottom: 20px;
      max-width: 75px;

    .profile-name
      text-transform: uppercase;
      font-weight: 600;

  #side-menu
    background: $color-bright;

    li
      border-bottom: 1px solid $border-color;

      &:first-child
        border-top: 1px solid $border-color;

      &.active
        background: #fff;

        a
          color: $color-navy-blue;

          .ti-angle-right
            transform: rotate(90deg);

      &:hover a
          color: $color-navy-blue;

      a
        color: $color-text;
        padding: 15px 20px;

        .ti-angle-right
          position: absolute;
          right: 20px;
          font-size: 0.8em;
          line-height: 20px;
          transition: transform .15s;

      .nav-second-level 
        li 
          &:last-child
            border-bottom: none;

          &.active a
            color: $color-navy-blue;
            background-color: $color-bright;

          a
            padding-left: 30px;

  .nav > li > a
    &:hover, &:focus
      background: #fff;
</style>

<script>
  import $ from 'jquery'
  // import 'metismenu/dist/metisMenu'

  export default {
    ready () {
      this.$nextTick(() => {
        $('#side-menu').metisMenu()
      })
    }
  }
</script>