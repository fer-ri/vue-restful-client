<template lang="jade">
  .notification.animated(
    :transition="transition",
    transition-mode="in-out"
    v-bind:class="`notification-${type}`"
  )
    button.notification-close(type="button", v-on:click="close") ×

    .notification-message(v-html="message")
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      },
      title: String,
      message: String,
      duration: {
        type: Number,
        default: 0
      },
      important: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'right'
      },
      position: {
        type: String,
        default: 'bottom-right'
      },
      container: {
        type: String,
        default: '.notification-container'
      }
    },
    data () {
      return {
        $_parent: null,
        timer: null
      }
    },
    computed: {
      transition () {
        return `bounce-${this.direction}`
      }
    },
    created () {
      let $parent = this.$parent

      if (!$parent) {
        let parent = document.querySelector(this.container)

        if (!parent) {
          // Lazy creating `div.alerts` container.
          parent = document.createElement('div')

          parent.classList.add(this.container.replace('.', ''))
          parent.classList.add('notification-' + this.position)

          const Notifications = Vue.extend()

          $parent = new Notifications({
            el: parent
          }).$appendTo(document.body)
        }
        // Hacked.
        this.$_parent_ = parent.__vue__
      }
    },
    compiled () {
      if (this.$_parent_) {
        this.$appendTo(this.$_parent_.$el)
        delete this.$_parent_
      }
    },
    ready () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => this.close(), this.duration)
      }
    },
    methods: {
      close () {
        clearTimeout(this.timer)

        this.$destroy(true)
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/scss/bootstrap/variables'

  @mixin notification-type($color)
    border-left: 6px solid $color;

  .notification-container
    position: fixed;
    z-index: 999999;

    & * 
      box-sizing: border-box;

    & > div
      padding: 20px;
      margin: 0 0 10px;
      width: 300px;
      background: #fff;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;

    .notification-message
      word-wrap: break-word;

    .notification-close
      padding: 0;
      cursor: pointer;
      background: none;
      border: 0;
      color: #000;
      opacity: 0.3;
      position: relative;
      right: -.3em;
      top: -.3em;
      float: right;
      font-size: 20px;

  .notification-bottom-right
    bottom: 20px;
    right: 20px;

  .notification-error
    @include notification-type($color-red);

  .notification-success
    @include notification-type($color-green);

  .notification-info
    @include notification-type($color-blue);

  .notification-warning
    @include notification-type($color-yellow);
</style>