import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import menu from './modules/menu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    menu
  },
  strict: debug
})
