import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const themSanPham = async (dispatch, param) => {
  var result = await client.post('/api/product', param)
  return result
}
export const laytatcasanpham = async (dispatch, param) => {
  var result = await client.post('/api/getProductSearch', param)
  return result
}
export const updateView = async (dispatch, param) => {
  var result = await client.put('/api/getProductSearch', param)
  return result
}
export const laysize = async (dispatch) => {
  var result = await client.get('/api/size')
  return result
}
export const layhinh = async (dispatch, param) => {
  var result = await client.post('/api/img', param)
  return result
}

export const deleteProduct = async (dispatch, param) => {
  var result = await client.delete('/api/deleteProduct/' + param)
  return result
}
export const getcolor = async () => {
  var result = await client.get('/api/color')
  return result
}
