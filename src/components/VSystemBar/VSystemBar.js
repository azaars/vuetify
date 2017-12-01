require('../../stylus/components/_system-bars.styl')

import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-system-bar',

  mixins: [Applicationable, Colorable, Themeable],

  props: {
    absolute: Boolean,
    fixed: Boolean,
    height: [Number, String],
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks(Object.assign({
        'system-bar--lights-out': this.lightsOut,
        'system-bar--absolute': this.absolute,
        'system-bar--fixed': this.fixed,
        'system-bar--status': this.status,
        'system-bar--window': this.window
      }, this.themeClasses))
    },
    computedHeight () {
      if (this.height) return parseInt(this.height)

      return this.window ? 32 : 24
    }
  },

  watch: {
    absolute () {
      this.updateApplication()
    },
    fixed () {
      this.updateApplication()
    },
    height () {
      this.updateApplication()
    },
    window () {
      this.updateApplication()
    }
  },

  methods: {
    updateApplication () {
      if (this.app) {
        this.$vuetify.application.bar = (this.fixed || this.absolute)
          ? this.computedHeight
          : 0
      }
    }
  },

  destroyed () {
    if (this.app) this.$vuetify.application.bar = 0
  },

  render (h) {
    const data = {
      staticClass: 'system-bar',
      'class': this.classes,
      style: {
        height: `${this.computedHeight}px`
      }
    }

    return h('div', data, this.$slots.default)
  }
}
