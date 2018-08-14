import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl } from '../utils'
import { host, api } from '../../../../../api/config/config'
import {
    USER_SESSION_REQUEST,
    USER_SESSION_FETCHING,
    USER_SESSION_RECEIVED,
    USER_SESSION_REQUEST_FAILED
} from '../actionTypes'


const url = `${host}/${api}`

export function* sessionLookUp() {
    let value = ''
    yield put({ type: USER_SESSION_FETCHING })
    try {
        value = yield call(getUrl, `${url}/auth/session`)
        yield put({ type: USER_SESSION_RECEIVED, value })
    }
    catch (err) {
        yield put({ type: USER_SESSION_REQUEST_FAILED, err })
    }
}

export function* watchUser() {
    yield fork(takeEvery, USER_SESSION_REQUEST, sessionLookUp)
}