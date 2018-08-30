import {
  USER_SESSION_FETCHING,
  USER_SESSION_RECEIVED,
  USER_SESSION_REQUEST_FAILED,
  USER_PHOTO_RECEIVED
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
    case USER_PHOTO_RECEIVED:
      return {
        ...state,
        userPhoto: action.userPhoto
      }

    default:
      return state
  }
}
