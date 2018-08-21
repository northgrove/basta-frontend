import {
    HISTORY_FETCHING,
    HISTORY_RECEIVED,
    HISTORY_COMPLETE,
    HISTORY_REQUEST_FAILED,
    STATUSLOG_FETCHING,
    STATUSLOG_RECEIVED,
    STATUSLOG_REQUEST_FAILED,
    ORDER_FETCHING,
    ORDER_RECEIVED,
    ORDER_REQUEST_FAILED
} from './actionTypes'


export default (state = {
    orderHistory: [],
    statusLog: [],
    order: {},
    orderHistoryCompleted: false,
    requestFailed: false,
    requestStatus: ''
}, action) => {
    switch (action.type) {

        // HISTORY

        case HISTORY_FETCHING:
            return {
                ...state,
                completed: false,
                requestFailed: false,
                requestStatus: 'Fetching history log'
            }
        case HISTORY_RECEIVED:
            return {
                ...state,
                orderHistory: state.orderHistory.concat(action.value),
                requestFailed: false,
                requestStatus: 'Order history partially complete'
            }
        case HISTORY_COMPLETE:
            return {
                ...state,
                orderHistoryCompleted: false,
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

            // STATUSLOG

        case STATUSLOG_FETCHING:
            return {
                ...state,
                requestFailed: false,
                requestStatus: `Fetching status log for ID:${action.action.orderId}`
            }
        case STATUSLOG_RECEIVED:
            return {
                ...state,
                statusLog: action.value,
                requestFailed: false,
                requestStatus: 'Statuslog request complete'
            }
        case STATUSLOG_REQUEST_FAILED:
            return {
                ...state,
                requestFailed: true,
                requestStatus: action.err
            }

            // ORDER

        case ORDER_FETCHING:
            return {
                ...state,
                requestFailed: false,
                requestStatus: `Fetching order ID:${action.action.orderId}`
            }
        case ORDER_RECEIVED:
            return {
                ...state,
                statusLog: action.value,
                requestFailed: false,
                requestStatus: 'Order request complete'
            }
        case ORDER_REQUEST_FAILED:
            return {
                ...state,
                requestFailed: true,
                requestStatus: action.err
            }
        default:
            return state
    }
}