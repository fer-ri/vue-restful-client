import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../mutation-types'

const state = {
  user: null
}

const mutations = {
  [USER_LOGGED_IN] (state, user) {
    state.user = user
  },

  [USER_LOGGED_OUT] (state) {
    state.user = null
  }
}

export default {
  state,
  mutations
}
