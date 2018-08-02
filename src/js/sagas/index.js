import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../example/sagas.js'


export default function* () {
    yield all([
        call(exampleSaga)
    ])
}
