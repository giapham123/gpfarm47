import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const saveSize = async (dispatch, param) => {
  var result = await client.post('/api/size', param)
  return result
}

export const getCate = async (dispatch) => {
  var result = await client.get('/api/cate')
  return result
}

export const saveCate = async (dispatch, param) => {
  var result = await client.post('/api/cate', param)
  return result
}
