import {
  USER_SESSION_FETCHING,
  USER_SESSION_RECEIVED,
  USER_SESSION_REQUEST_FAILED
} from '../actionTypes'

export default (
  state = {
    currentUser: {
      userName: '',
      roles: {}
    },
    isUserAuthenticated: false,
    isFetching: false,
    requestFailed: false,
    requestStatus: ''
  },
  action
) => {
  switch (action.type) {
    // USER SESSION

    case USER_SESSION_FETCHING:
      return {
        ...state,
        requestFailed: false,
        requestStatus: 'Fetching user session'
      }
    case USER_SESSION_RECEIVED:
      return {
        ...state,
        currentUser: action.value,
        isUserAuthenticated: true,
        requestFailed: false,
        requestStatus: 'User session lookup successful'
      }
    case USER_SESSION_REQUEST_FAILED:
      return {
        ...state,
        currentUser: {},
        isUserAuthenticated: false,
        requestFailed: true,
        requestStatus: action.err
      }
    default:
      return state
  }
}
