import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getAllCustomers = async (dispatch, param) => {
  var result = await client.get('api/getAllCustomerHaventPayYet', param)
  return result
}
export const searchCustomer = async (dispatch, param) => {
  var result = await client.post('api/getAllCustomerHaventPayYet', param)
  return result
}
export const getAllDetailPayment = async (dispatch, param) => {
  var result = await client.post('api/getAllDetailPayment', param)
  return result
}
export const detailPaymentViews = async (dispatch, param) => {
  var result = await client.post('api/detailPaymentViews', param)
  return result
}
