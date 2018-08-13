import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {App} from './App'
import {History} from './views/history/History'
import {Operate} from './views/operate/Operate'
import {Create} from './views/create/Create'
import {NotFound} from './views/notfound/NotFound'

// Routes
export const routes = () => {
    return (
        <Route path='/' component={App}>
            <IndexRoute component={History} />
            <Route path='/operate' component={Operate} />
            <Route path='/create' component={Create} />
            <Route path='*' component={NotFound} />
        </Route>
    )
}
