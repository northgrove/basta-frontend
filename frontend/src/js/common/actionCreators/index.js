import {
  USER_PROFILE_REQUEST,
  INITIALIZE_APPLICATION,
  USER_LOGOUT,
  ENVIRONMENTS_REQUEST,
  RESOURCES_REQUEST,
  APPLICATIONS_REQUEST
} from '../actionTypes'

export const fetchUserProfile = () => {
  return { type: USER_PROFILE_REQUEST }
}
export const userLogout = () => {
  return { type: USER_LOGOUT }
}

export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}

export const fetchEnvironments = environmentClass => {
  return { type: ENVIRONMENTS_REQUEST, environmentClass }
}
export const fetchApplications = () => {
  return { type: APPLICATIONS_REQUEST }
}
export const fetchResources = envClass => {
  return { type: RESOURCES_REQUEST, envClass }
}
