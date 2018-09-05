import { USER_PROFILE_REQUEST, INITIALIZE_APPLICATION, USER_PHOTO_REQUEST } from '../actionTypes'

export const fetchUserProfile = () => {
  return { type: USER_PROFILE_REQUEST }
}
export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}

export const fetchPhoto = upn => {
  return { type: USER_PHOTO_REQUEST, upn }
}
