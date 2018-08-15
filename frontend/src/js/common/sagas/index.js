import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../../containers/exampleView/sagas.js'
import { watchUser } from './user'
import { watchOrderHistory } from '../../containers/history/sagas'


export default function* () {
    yield all([
        call(exampleSaga),
        call(watchUser),
        call(watchOrderHistory)
    ])
}