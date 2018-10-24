import { HISTORY_REQUEST, HISTORY_APPLY_FILTER, HISTORY_EXPAND_FILTER_ARRAY } from './actionTypes'

export const getOrderHistory = (pageSize, fromDate, toDate) => {
  return { type: HISTORY_REQUEST, pageSize, toDate, fromDate }
}

export const applyOrderHistoryFilter = (filter, nMaxResults) => {
  return { type: HISTORY_APPLY_FILTER, filter, nMaxResults }
}
