import {
    HISTORY_REQUEST,
    STATUSLOG_REQUEST,
    ORDER_REQUEST
} from './actionTypes'

export const getOrderHistory = (pageSize, toDate, fromDate) => { return { type: HISTORY_REQUEST, pageSize, toDate, fromDate } }
export const getStatusLog = (orderId) => { return { type: STATUSLOG_REQUEST, orderId } }
export const getOrder = (orderId) => { return { type: ORDER_REQUEST, orderId } }