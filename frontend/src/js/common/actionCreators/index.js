import { USER_SESSION_REQUEST, INITIALIZE_APPLICATION } from '../actionTypes'

export const userSessionRequest = () => {
  return { type: USER_SESSION_REQUEST }
}
export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}
