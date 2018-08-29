import { all, call } from 'redux-saga/effects'
import { watchUser } from './user'
import { watchInitialize } from './initialize'
import { watcHistory } from '../../containers/history/sagas'
import { watchOrder } from './order'

export default function*() {
  yield all([
    call(watchUser),
    call(watcHistory),
    call(watchOrder),
    call(watchInitialize)
  ])
}
