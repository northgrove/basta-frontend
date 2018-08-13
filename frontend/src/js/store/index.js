import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './configureStore'
import createBrowserHistory from 'history/createBrowserHistory'

const store = configureStore()
syncHistoryWithStore(createBrowserHistory({}), store)

export default store
