import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import {createBrowserHistory} from 'history'
import { App } from './App'

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory({})}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
)