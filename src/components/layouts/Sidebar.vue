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
        li(v-link-active, v-for="item in menu")
          a(v-link="item.link", v-on:click="fixDropdown")
            | {{{ item.before }}}
            span.nav-label {{ item.label }}
            | {{{ item.after }}}
            
            i.arrow.fa.fa-angle-right(v-if="hasChildren(item)")

          ul.nav.nav-second-level(v-if="hasChildren(item)")
            li(v-for="child in item.children")
              a(v-link="child.link") 
                | {{{ child.before }}}
                | {{ child.label }}
                | {{{ child.after }}}
        li(v-link-active)
          a(v-link="{ path: '/hello' }", v-on:click="fixDropdown")
            span.nav-label Hello
</template>

<style lang="sass" scoped>
  @import "~assets/scss/bootstrap/variables";

  body.page-small #menu,
  body.hide-sidebar #menu
    margin-left: -$menu-width;

  body.page-small.show-sidebar #menu
    margin-left: 0;

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

          .arrow
            transform: rotate(90deg);

      &:hover a
          color: $color-navy-blue;

      a
        color: $color-text;
        padding: 15px 20px;
        cursor: pointer;

        .arrow
          position: absolute;
          right: 20px;
          font-size: 1.3em;
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
  import { menu } from '../../vuex/getters'

  export default {
    ready () {
      this.$nextTick(() => {
        $('#side-menu').metisMenu()
      })
    },
    methods: {
      hasChildren (item) {
        return Array.isArray(item.children) && item.children.length > 0
      },
      fixDropdown (event) {
        let children = $(event.target)
          .parents('li')
          .siblings()
          .children('ul.collapse.in')

        children
          .removeClass('in')
          .attr('aria-expanded', false)
          .parent('li')
          .removeClass('active')
      }
    },
    vuex: {
      getters: {
        menu
      }
    }
  }
</script>