import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { pollSessionWorker } from './polling'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl, postForm } from '../../common/utils'

it('(Saga - pollSessionWorker) GETs user object and stores it in store ', () => {
  const action = {}
  const value = {
    id: 6969
  }
  return expectSaga(pollSessionWorker, action)
    .provide([[matchers.call.fn(getUrl), value]])
    .put({
      type: 'USER_SESSION_ACTIVE'
    })
    .run()
})

////////////////////////////////MOCKS//////////////////////////////////////////////
