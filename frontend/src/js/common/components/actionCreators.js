import { SUBMIT_FORM } from './actionTypes'
export const submitForm = (key, form) => {
  return { type: SUBMIT_FORM, key, form }
}
