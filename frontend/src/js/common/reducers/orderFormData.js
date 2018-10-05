import {
  RESOURCES_REQUEST_FAILED,
  RESOURCES_RECEIVED,
  RESOURCES_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED,
  APPLICATIONS_FETCHING,
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
    },
    applications: {
      fetching: false,
      error: null,
      data: []
    },
    resources: {
      fetching: false,
      error: null,
      data: {
        u: [],
        t: [],
        q: [],
        p: []
      }
    }
  },
  action
) => {
  switch (action.type) {
    // APPLICATIONS

    case APPLICATIONS_FETCHING:
      return {
        ...state,
        applications: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case APPLICATIONS_RECEIVED:
      return {
        ...state,
        applications: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case APPLICATIONS_REQUEST_FAILED:
      return {
        ...state,
        applications: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    // RESOURCES

    case RESOURCES_FETCHING:
      return {
        ...state,
        resources: {
          fetching: true,
          error: null,
          data: state.resources.data
        }
      }
    case RESOURCES_RECEIVED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: null,
          data: { ...state.resources.data, [action.envClass]: action.value }
        }
      }
    case RESOURCES_REQUEST_FAILED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: action.error,
          data: state.resources.data
        }
      }
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
