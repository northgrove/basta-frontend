import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { exampleReducer } from '../components/exampleView/reducers.js'

const rootReducer = combineReducers({
    routing: routerReducer,
    example: exampleReducer
})

export default rootReducer
