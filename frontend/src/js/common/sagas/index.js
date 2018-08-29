import { all, call } from 'redux-saga/effects'
import { watchUser } from './user'
import { watchInitialize } from './initialize'
import { watcHistory } from '../../containers/history/sagas'
import { watchForm } from '../components/sagas'
import { watchPollSession } from './polling'
import { watchOrder } from './order'

export default function*() {
  yield all([
    call(watchUser),
    call(watcHistory),
    call(watchForm),
    call(watchInitialize),
    call(watchPollSession),
    call(watchOrder),
    call(watchInitialize)
  ])
}
