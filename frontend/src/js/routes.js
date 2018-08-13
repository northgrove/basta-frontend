import React from 'react'
import { Route, Switch } from 'react-router'

import {History} from './components/history/History'
import {Operate} from './components/operate/Operate'
import {Create} from './components/create/Create'
import {NotFound} from './components/notfound/NotFound'

// Routes
export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={History} />
            <Route path='/operate' component={Operate} />
            <Route path='/create' component={Create} />
            <Route path='*' component={NotFound} />
        </Switch>
    )
}
