import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { exampleReducer } from '../../containers/exampleView/reducers.js'
import user from '../reducers/user'
import navMenu from '../../containers/navMenu/reducer'


const rootReducer = combineReducers({
    routing: routerReducer,
    example: exampleReducer,
    navMenu,
    user
})

export default rootReducer