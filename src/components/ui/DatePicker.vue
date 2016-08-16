<template>
  <partial :name="name">
    <slot></slot>
  </partial>
</template>

<script>
import { init as Flatpickr } from 'flatpickr'

function Datepicker (selector, config, l10n) {
  this.l10n = Object.assign({}, Flatpickr.prototype.l10n, l10n)
  return Flatpickr.call(this, selector, config)
}

Datepicker.prototype = Flatpickr.prototype

export default {
  partials: {
    singleInput: `
      <input class="form-control" type="text" :placeholder="placeholder" :readonly="readonly" v-model="value"/>
    `,
    wrapperInput: `
      <div class="form-group has-addons flatpickr" data-wrap="true" data-clickOpens="true">
        <div class="input-group">
          <input class="form-control" type="text" :placeholder="placeholder" :readonly="readonly" v-model="value" data-input/>
          <slot></slot>
        </div>
      </div>
    `
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    l10n: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: 'Pick date'
    },
    readonly: Boolean,
    value: {
      type: String,
      twoWay: true
    }
  },

  ready () {
    this.create()
  },

  beforeDestroy () {
    this.destroy()
  },

  attached () {
    this.create()
  },

  detached () {
    this.destroy()
  },

  methods: {
    create () {
      if (!this.datepicker) {
        this.datepicker = new Datepicker(this.$el.nextSibling, this.config, this.l10n)

        this.datepicker.set('onChange', (d, s) => {
          this.$dispatch('datepicker:changed', this.datepicker, d, s)

          this.$set('value', s)
        })
      }
    },

    destroy () {
      if (this.datepicker && !this.static) {
        this.datepicker.destroy()
        this.datepicker = null
      }
    }
  },

  computed: {
    wrap () {
      return !!this.config.wrap
    },
    static () {
      return !!this.config.static
    },
    name () {
      return this.wrap ? 'wrapperInput' : 'singleInput'
    }
  }
}
</script>

<style lang="stylus">
$calendar_background = #ffffff
$calendar_border_color = #d3d6db

$months_color = #111
$months_background = transparent

$weekdays_background = transparent

$day_text_color = #222324
$day_hover_background_color = #d3d6db

$today_color = #ed6c63
$selected_day_background = #1fc8db

@import '~flatpickr/src/style/flatpickr_base'
</style>