import {
    HISTORY_FETCHING,
    HISTORY_RECEIVED,
    HISTORY_COMPLETE,
    HISTORY_REQUEST_FAILED
} from './actionTypes'


export default (state = {
    orderHistory: [],
    completed: false,
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
                requestStatus: 'Fetching user session'
            }
        case HISTORY_RECEIVED:
            return {
                ...state,
                orderHistory: action.value,
                requestFailed: false,
                requestStatus: action.value.message
            }
        case HISTORY_COMPLETE:
            return {
                ...state,
                completed: true,
                requestFailed: false,
                requestStatus: action.value.message
            }
        case HISTORY_REQUEST_FAILED:
            return {
                ...state,
                completed: false,
                requestFailed: true,
                requestStatus: action.err
            }
        default:
            return state
    }
}