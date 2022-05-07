import { ApiClient } from '../../../http-common'
import route from '../../../router'
const client = new ApiClient()
export const loginForm = async ({ commit }, payload) => {
  var result = await client.post('/api/login', payload)
  if (result.data.is_login == false) {
    handleLogin(commit, false)
  } else {
    var access_token = result.data.access_token
    var refresh_token = result.data.refresh_token
    var userProfile = result.data.data[0].username
    var path_url = result.data.path
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('user', userProfile)
    localStorage.setItem('path', JSON.stringify(path_url))
    route.push('/')
    handleLogin(commit, true)
  }
  return result.data
}

export const refresh_token = async () => {
  var token = {
    refresh_token: localStorage.getItem('refresh_token')
  }
  var resultRefresh = await client.post('/api/getAccessToken', token)
  var access_token = resultRefresh.data.access_token
  localStorage.setItem('access_token', access_token)
}

export const logout = async ({ commit }) => {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('path')
  localStorage.removeItem('user')
  handleLogout(commit)
}
const handleLogout = (commit) => {
  commit('login', null)
}

const handleLogin = (commit, access_token) => {
  commit('login', access_token)
}
export const changePassword = async (dispatch, param) => {
  var resultRefresh = await client.post('/api/changePassword', param)
  return resultRefresh.data
}
