import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getDataInRetailView = async (dispatch) => {
  var result = await client.get('/api/searchDataInRetailView')
  return result
}
export const searchDataInRetailView = async (dispatch, param) => {
  var result = await client.post('/api/searchDataInRetailView', param)
  return result
}
export const layhinh = async (dispatch, param) => {
  var result = await client.post('/api/img', param)
  return result
}
export const laysize = async (dispatch) => {
  var result = await client.get('/api/size')
  return result
}
export const SaveDataInRetailView = async (dispatch, param) => {
  var result = await client.post('/api/SaveDataInRetailView', param)
  return result
}
export const getAllProductInWarehouseAndBlock = async (dispatch, param) => {
  var result = await client.get('/api/getAllProductInWarehouseAndBlock')
  return result
}
export const getForRetail = async (dispatch, param) => {
  var result = await client.post('/api/getForRetail', param)
  return result
}
export const deleteProductDetail = async (dispatch, param) => {
  var result = await client.delete('/api/deleteProductDetail/' + param)
  return result
}
