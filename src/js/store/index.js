import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './configureStore'
import { createBrowserHistory } from 'history'

const store = configureStore()
syncHistoryWithStore(createBrowserHistory({}), store)

export default store
