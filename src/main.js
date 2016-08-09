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
import Auth from './http/jwt-auth'
import routes from './http/routes'
import middlewares from './http/middlewares'
import interceptors from './http/interceptors'

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.interceptors.concat(interceptors)
Vue.http.options.root = config.api.root

var router = new VueRouter({
  linkActiveClass: 'active'
})

router.map(routes)

middlewares(router)

sync(store, router)

Vue.use(Auth, config.api.auth, router)

router.start(App, 'app')
