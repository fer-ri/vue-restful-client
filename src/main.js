// Core dependencies
import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'

// App components
import App from './App'
import config from './config'
import store from './vuex/store'
import http from './http'

config.transition()

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(VueResource)

http.interceptors.forEach((item) => {
  Vue.http.interceptors.push(item)
})

Vue.http.options.root = config.api.root

var router = new VueRouter({
  linkActiveClass: 'active'
})

router.map(http.routes)

http.middlewares(router)

sync(store, router)

Vue.use(http.progress, config.progress, router)
Vue.use(http.jwtAuth, config.api.auth, router)

router.start(App, 'app')
