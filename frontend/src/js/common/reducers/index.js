import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import initialize from './initialize'
import navMenu from '../../containers/navMenu/reducer'
import history from '../../containers/history/reducers'
import order from './order'

const rootReducer = combineReducers({
  routing: routerReducer,
  navMenu,
  user,
  initialize,
  history,
  order
})

export default rootReducer
