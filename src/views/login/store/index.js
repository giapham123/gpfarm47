import * as actions from './actions'

const state = {
  account: null,
  is_login: false
}
const mutations = {
  login (state, token) {
    state.account = null,
    state.is_login = token
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
