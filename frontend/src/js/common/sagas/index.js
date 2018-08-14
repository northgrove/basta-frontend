import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../../components/exampleView/sagas.js'
import { watchUser } from './user'


export default function* () {
    yield all([
        call(exampleSaga),
        call(watchUser)
    ])
}