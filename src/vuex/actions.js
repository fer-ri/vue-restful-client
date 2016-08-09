import * as types from './mutation-types'

// modules/auth
export const login = ({ dispatch, state }, user) => {
  dispatch(types.USER_LOGGED_IN, user)
}

export const logout = ({ dispatch }) => {
  dispatch(types.USER_LOGGED_OUT)
}
