import { all, call } from 'redux-saga/effects'
import { exampleSaga } from '../../containers/exampleView/sagas.js'
import { watchUser } from './user'
import { watchInitialize } from './initialize'
import { watcHistory } from '../../containers/history/sagas'
import { watchForm } from '../components/sagas'
import { watchPollSession } from './polling'

export default function*() {
  yield all([
    call(exampleSaga),
    call(watchUser),
    call(watcHistory),
    call(watchForm),
    call(watchInitialize),
    call(watchPollSession)
  ])
}
