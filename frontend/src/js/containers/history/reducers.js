import { formatPayload } from '../../common/formatPayload'
import {
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED
} from './actionTypes'

export default (
  state = {
    orderHistory: [],
    statusLog: [],
    order: {},
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
        orderHistoryCompleted: false,
        requestFailed: false,
        requestStatus: 'Fetching history log'
      }
    case HISTORY_RECEIVED:
      return {
        ...state,
        orderHistory: state.orderHistory.concat(formatPayload(action.value)),
        requestFailed: false,
        requestStatus: 'Order history partially complete'
      }
    case HISTORY_COMPLETE:
      return {
        ...state,
        orderHistoryCompleted: true,
        requestFailed: false,
        requestStatus: 'Order history request complete'
      }
    case HISTORY_REQUEST_FAILED:
      return {
        ...state,
        orderHistoryCompleted: false,
        requestFailed: true,
        requestStatus: action.err
      }

    default:
      return state
  }
}
