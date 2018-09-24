import { HISTORY_REQUEST, HISTORY_APPLY_FILTER } from './actionTypes'

export const getOrderHistory = (pageSize, toDate, fromDate) => {
  return { type: HISTORY_REQUEST, pageSize, toDate, fromDate }
}

export const applyOrderHistoryFilter = (filter, nMaxResults) => {
  return { type: HISTORY_APPLY_FILTER, filter, nMaxResults }
}
