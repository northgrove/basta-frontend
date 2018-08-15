import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl } from '../../common/utils'
import { api } from '../../../../../api/config/config'
import {
    HISTORY_REQUEST,
    HISTORY_FETCHING,
    HISTORY_RECEIVED,
    HISTORY_COMPLETE,
    HISTORY_REQUEST_FAILED
} from './actionTypes'


const url = `${api}`

export function* getOrderHistory(action) {
    let value = ''
    if (!action.toDate) action.toDate = 0
    if (!action.fromDate) action.fromDate = 0
    
    yield put({ type: HISTORY_FETCHING })
    try {
        console.log('getOrderHistory')
        console.log(action)
        // value = yield call(getUrl, `${url}/auth/session`)
        // yield put({ type: USER_SESSION_RECEIVED, value })
    }
    catch (err) {
        // yield put({ type: USER_SESSION_REQUEST_FAILED, err })
    }
}

export function* watchOrderHistory() {
    yield fork(takeEvery, HISTORY_REQUEST, getOrderHistory)
}