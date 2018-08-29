import { USER_SESSION_REQUEST, INITIALIZE_APPLICATION, SUBMIT_FORM } from '../actionTypes'

export const userSessionRequest = () => {
  return { type: USER_SESSION_REQUEST }
}
export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}
export const submitForm = (key, form) => {
    return { type: SUBMIT_FORM, key, orders: form }
}
