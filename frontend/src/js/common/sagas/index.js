import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../../containers/exampleView/sagas.js'
import { watchUser } from './user'
import { watcHistory } from '../../containers/history/sagas'


export default function* () {
    yield all([
        call(exampleSaga),
        call(watchUser),
        call(watcHistory)
    ])
}