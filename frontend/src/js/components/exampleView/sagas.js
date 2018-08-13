import { takeEvery, put, fork, call } from 'redux-saga/effects'
import {
    EXAMPLE_ACTION,
} from './actionTypes.js'

export function* example(action) {
    yield put({ type: EXAMPLE_ACTION })
}

export function* exampleSaga() {
    yield fork(takeEvery, EXAMPLE_ACTION, example)
}
