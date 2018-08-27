import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, postForm } from '../utils'
import { api } from '../../../../../api/config/config'
import {
    SUBMIT_FORM,
    FORM_SUBMITTING,
    FORM_SUBMIT_SUCCESSFUL,
    FORM_SUBMIT_FAILED
} from './actionTypes'



const url = `${api}`

export function* sessionLookUp() {
    let value = ''
    yield put({ type: FORM_SUBMITTING })
    try {
        switch (key){
            case 'developertools':
                value = yield call(postForm, `${url}/create/developertools`, action.form)

        }
        yield put({ type: FORM_SUBMIT_SUCCESSFUL, value })
    }
    catch (error) {
        yield put({ type: FORM_SUBMIT_FAILED, error })
    }
}

export function* watchUser() {
    yield fork(takeEvery, SUBMIT_FORM, sessionLookUp)
}