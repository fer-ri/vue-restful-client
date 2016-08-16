<template lang="jade">
  #wrapper
    .content.animate-panel
      slot

    app-footer
</template>

<style lang="sass">
  @import "~assets/scss/bootstrap/variables";

  body.page-small #wrapper,
  body.hide-sidebar #wrapper
    margin-left: 0;

  body.page-small.show-sidebar #wrapper
    margin-left: $menu-width;

  #wrapper
    margin: 0 0 0 $menu-width;
    padding: 0;
    background: $color-background;
    border-left: 1px solid $border-color;
    transition: all 0.4s ease 0s;
    position: relative;
    min-height: 100%;

  .content
    padding: 25px 40px 40px 40px;
    min-width: 320px;

    .page-title
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 300;

  .hpanel 
    background-color: none;
    border: none;
    box-shadow: none;
    margin-bottom: 25px;

    & > .panel-heading
      color: inherit;
      font-weight: 600;
      padding: 10px 4px;
      transition: all .3s;
      border: 1px solid transparent;

    .panel-body
      background: #fff;
      border: 1px solid $border-color;
      border-radius: 2px;
      padding: 20px;
      position: relative;
</style>

<script>
  import $ from 'jquery'
  import Footer from './Footer'

  export default {
    components: {
      appFooter: Footer
    },
    ready () {
      this.$nextTick(() => {
        this.adjustWrapperHeight()
        this.setBodySmall()

        $(window).bind('resize click', () => {
          this.adjustWrapperHeight()
          this.setBodySmall()
        })
      })
    },
    methods: {
      adjustWrapperHeight () {
        let headerHeight = 62
        let asideHeight = $('#navigation').height()
        let contentHeight = $('.content').height()

        if (contentHeight < asideHeight) {
          $('#wrapper').css('min-height', asideHeight + 'px')
        }

        if (contentHeight < asideHeight && asideHeight < $(window).height()) {
          $('#wrapper').css('min-height', $(window).height() - headerHeight + 'px')
        }

        if (contentHeight > asideHeight && contentHeight < $(window).height()) {
          $('#wrapper').css('min-height', $(window).height() - headerHeight + 'px')
        }
      },
      setBodySmall () {
        if ($('body').width() < 769) {
          $('body').addClass('page-small')
        } else {
          $('body').removeClass('page-small')
          $('body').removeClass('show-sidebar')
        }
      }
    }
  }
</script>