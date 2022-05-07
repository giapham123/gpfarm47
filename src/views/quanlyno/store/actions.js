import { ApiClient } from '../../../http-common'
const client = new ApiClient()

export const allProductIsPay = async (dispatch, param) => {
  var result = await client.post('/api/productForPay', param)
  return result
}
export const layhinh = async (dispatch, param) => {
  var result = await client.post('/api/img', param)
  return result
}

export const paymentProduct = async (dispatch, param) => {
  var result = await client.put('/api/productForPay', param)
  return result
}
