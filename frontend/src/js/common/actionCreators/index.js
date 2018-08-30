import {
  USER_SESSION_REQUEST,
  INITIALIZE_APPLICATION,
  SUBMIT_FORM,
  USER_PHOTO_REQUEST
} from '../actionTypes'

export const userSessionRequest = () => {
  return { type: USER_SESSION_REQUEST }
}
export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}
export const submitForm = (key, form) => {
  return { type: SUBMIT_FORM, key, orders: form }
}
export const fetchPhoto = upn => {
  return { type: USER_PHOTO_REQUEST, upn }
}
