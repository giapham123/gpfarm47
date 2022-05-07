import * as actions from './actions'
const state = {
  urlChange: null
}
const mutations = {
  changeUrl (state, url) {
    state.urlChange = url
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
