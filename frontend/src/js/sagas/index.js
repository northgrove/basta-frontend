import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../views/exampleView/sagas.js'


export default function* () {
    yield all([
        call(exampleSaga)
    ])
}
