import { USER_PROFILE_REQUEST, INITIALIZE_APPLICATION } from '../actionTypes'

export const fetchUserProfile = () => {
  return { type: USER_PROFILE_REQUEST }
}
export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}
