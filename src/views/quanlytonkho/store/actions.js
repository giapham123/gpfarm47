import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const laytatcasanphamtrongkho = async (dispatch, param) => {
  var result = await client.post('api/getAllProductInWarehouse', param)
  return result
}
export const layhinh = async (dispatch, param) => {
  var result = await client.post('api/img', param)
  return result
}
export const createOrder = async (dispatch, param) => {
  var result = await client.post('api/orderView', param)
  return result
}
export const layTatCaOrder = async (dispatch) => {
  var result = await client.get('api/orderView')
  return result
}

export const luuOrder = async (dispatch, param) => {
  var result = await client.post('api/wholesale', param)
  return result
}

export const errorProduct = async (dispatch) => {
  var result = await client.get('api/saveErrorProduct')
  return result
}

export const detailproduct = async (dispatch, param) => {
  var result = await client.post('api/detailproduct', param)
  return result
}

export const exportExcelBillInOrder = async (dispatch, param) => {
  var result = await client.post('api/exportExcelBillInOrder', param)
  return result
}
