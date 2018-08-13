import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { exampleReducer } from '../../components/exampleView/reducers.js'
import user from '../reducers/user'


const rootReducer = combineReducers({
    routing: routerReducer,
    example: exampleReducer,
    user
})

export default rootReducer