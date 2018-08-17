import React from 'react'
import {Route, Switch, Layout} from 'react-router'

import {History} from '../containers/history/History'
import Operate from '../containers/operate/Operate'
import Create from '../containers/create/Create'
import Iapptools from '../containers/create/iapptools/Iapptools'
import {WasNode} from '../containers/create/was-node/WasNode'
import {WasDmgr} from '../containers/create/was-dmgr/WasDmgr'
import {BpmNode} from '../containers/create/bpm-node/BpmNode'
import {BpmDmgr} from '../containers/create/bpm-dmgr/BpmDmgr'
import {NotFound} from '../containers/notfound/NotFound'

// Routes
export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={History}/>
            <Route path='/operate' component={Operate}/>
            <Route exact path='/create' component={Create}/>
            <Route path='/create/iapptools' component={Iapptools}/>
            <Route path='/create/was-node' component={WasNode}/>
            <Route path='/create/was-dmgr' component={WasDmgr}/>
            <Route path='/create/bpm-node' component={BpmNode}/>
            <Route path='/create/bpm-dmgr' component={BpmDmgr}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    )
}
