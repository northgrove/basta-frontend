import { HISTORY_REQUEST } from './actionTypes'

export const getOrderHistory = (pageSize, toDate, fromDate) => {
  return { type: HISTORY_REQUEST, pageSize, toDate, fromDate }
}
