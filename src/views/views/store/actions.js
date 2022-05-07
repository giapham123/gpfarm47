import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getAllData = async (dispatch, param) => {
  var result = await client.post('api/AllDataHome', param)
  return result
}

export const getNewProduct = async (dispatch) => {
  var result = await client.get('api/getNewProduct')
  return result
}

export const getDetailProduct = async (dispatch, param) => {
  var result = await client.post('api/getDetailProduct', param)
  return result
}

export const getRelatedProduct = async (dispatch, param) => {
  var result = await client.post('api/getRelatedProduct', param)
  return result
}

export const changeURL = ({ commit }, param) => {
  handleUrl(commit, param)
}
const handleUrl = (commit, url) => {
  commit('changeUrl', url)
}
