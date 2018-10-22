import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { pollSessionWorker } from './polling'
import userReducer from '../reducers/user'
import * as matchers from 'redux-saga-test-plan/matchers'
import { getUrl, postForm } from '../../common/utils'

it('(Saga - pollSessionWorker) GETs session status and does nothing if session is active ', () => {
  const action = {}
  const delay = a => {
    return a
  }
  return expectSaga(pollSessionWorker, action)
    .provide({
      call(effect, next) {
        if (effect.fn === delay) return null
        if (effect.fn === getUrl) return {}
        return next()
      }
    })
    .put({
      type: 'USER_SESSION_ACTIVE'
    })
    .run(5000)
})

it('(Saga - pollSessionWorker) GETs session status and terminates session client side if err/expired session ', () => {
  const action = {}
  const delay = a => a
  const err = Error('error')

  return expectSaga(pollSessionWorker, action)
    .withReducer(userReducer)
    .provide({
      call(effect, next) {
        if (effect.fn === delay) return null
        if (effect.fn === getUrl) throw err
        return next()
      }
    })
    .put({
      type: 'USER_SESSION_EXPIRED',
      err: err
    })
    .hasFinalState({
      userProfile: {},
      isUserAuthenticated: false,
      isFetching: false,
      requestFailed: false,
      requestStatus: 'Session expired'
    })
    .run(5000)
})
////////////////////////////////MOCKS//////////////////////////////////////////////
