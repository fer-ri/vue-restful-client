;(function () {
  let vueProgress = {}

  let NProgress = typeof require === 'function'
    ? require('nprogress')
    : window.NProgress

  if (!NProgress) {
    throw new Error('[vue-progress] cannot locate NProgress.js.')
  }

  vueProgress.install = function (Vue, options, router) {
    NProgress.configure(options)

    Vue.http.interceptors.push((request, next) => {
      NProgress.inc(0.2)

      next((response) => {
        NProgress.done()

        return response
      })
    })

    router.beforeEach(function (transition) {
      NProgress.start()
      transition.next()
    })

    router.afterEach(() => {
      NProgress.done()
    })
  }

  if (typeof exports === 'object') {
    module.exports = vueProgress
  } else if (window.Vue) {
    window.VueProgress = vueProgress
    window.Vue.use(vueProgress)
  }
})()
