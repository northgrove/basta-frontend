import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import {createBrowserHistory} from 'history'
import {routes} from './routes'

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory({})}>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('app')
)