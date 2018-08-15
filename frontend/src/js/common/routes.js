import React from 'react'
import { Route, Switch } from 'react-router'

import {History} from '../containers/history/History'
import {Operate} from '../containers/operate/Operate'
import {Create} from '../containers/create/Create'
import {NotFound} from '../containers/notfound/NotFound'

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
