import {
    FORM_SUBMITTING,
    FORM_SUBMIT_SUCCESSFUL,
    FORM_SUBMIT_FAILED
} from './actionTypes'


export default (state = {
    fetching: false,
    completed: false,
    failed: false,
    orderNumber: null,
    error: null

}, action) => {
    switch (action.type) {

        // ORDERFORM

        case FORM_SUBMITTING:
            return {
                ...state,
                fetching: true,
                completed: false,
                failed: false,
                orderNumber: null
            }
        case FORM_SUBMIT_SUCCESSFUL:
            return {
                ...state,
                completed: true,
                fetching: false,
                orderNumber: action.value
            }
        case FORM_SUBMIT_FAILED:
            return {
                ...state,
                fetching: false,
                completed: true,
                failed: true,
                error: action.error

            }
        default:
            return state
    }
}