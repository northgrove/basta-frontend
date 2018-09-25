import {
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  ENVIRONMENTS_FETCHING
} from '../actionTypes'

export default (
  state = {
    environments: {
      fetching: false,
      error: null,
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    // ENVIRONMENTS

    case ENVIRONMENTS_FETCHING:
      return {
        ...state,
        environments: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case ENVIRONMENTS_RECEIVED:
      return {
        ...state,
        environments: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case ENVIRONMENTS_REQUEST_FAILED:
      return {
        ...state,
        environments: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    default:
      return state
  }
}
