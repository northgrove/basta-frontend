import { formatPayload } from '../../common/formatPayload'
import {
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED,
  HISTORY_APPLY_FILTER_SLICE,
  HISTORY_APPLY_FILTER_TAG,
  HISTORY_APPLY_FILTER_FILTER,
  HISTORY_APPLY_FILTER_FORMAT,
  HISTORY_APPLY_FILTER_COMPLETE
} from './actionTypes'

export default (
  state = {
    orderHistory: [],
    filteredOrderHistory: [],
    totalOrders: 0,
    orderHistoryCompleted: false,
    requestFailed: false,
    requestStatus: ''
  },
  action
) => {
  switch (action.type) {
    // HISTORY

    case HISTORY_FETCHING:
      return {
        ...state,
        orderHistory: [],
        totalOrders: 0,
        orderHistoryCompleted: false,
        requestFailed: false,
        requestStatus: 'Fetching history log'
      }
    case HISTORY_RECEIVED:
      return {
        ...state,
        orderHistory: state.orderHistory.concat(action.value),
        totalOrders: state.orderHistory.length,
        requestFailed: false,
        requestStatus: 'Order history partially complete'
      }
    case HISTORY_COMPLETE:
      return {
        ...state,
        orderHistoryCompleted: true,
        totalOrders: state.orderHistory.length,
        requestFailed: false,
        requestStatus: 'Order history request complete'
      }
    case HISTORY_REQUEST_FAILED:
      return {
        ...state,
        orderHistoryCompleted: false,
        totalOrders: 0,
        requestFailed: true,
        requestStatus: action.err
      }
    case HISTORY_APPLY_FILTER_COMPLETE:
      return {
        ...state,
        filteredOrderHistory: action.orders
      }
    case HISTORY_APPLY_FILTER_SLICE:
      return {
        ...state
      }
    case HISTORY_APPLY_FILTER_TAG:
      return {
        ...state
      }
    case HISTORY_APPLY_FILTER_FILTER:
      return {
        ...state
      }
    case HISTORY_APPLY_FILTER_FORMAT:
      return {
        ...state
      }

    default:
      return state
  }
}
