import { ApiClient } from '../../../http-common'
const client = new ApiClient()

export const layhinh = async (dispatch, param) => {
  var result = await client.post('/api/img', param)
  return result
}

export const getBillInOrder = async (dispatch, param) => {
  var result = await client.post('/api/getBillInOrder', param)
  return result
}
export const getBillRetail = async (dispatch, param) => {
  var result = await client.post('/api/getBillRetail', param)
  return result
}

export const saveErrorProduct = async (dispatch, param) => {
  var result = await client.put('/api/saveErrorProduct', { id: param.id })
  return result
}
export const getDetailBillForRetail = async (dispatch, param) => {
  var result = await client.post('/api/getDetailBillForRetail', param)
  return result
}
