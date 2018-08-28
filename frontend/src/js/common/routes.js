import React from 'react'
import { Route, Switch, Layout } from 'react-router'

import History from '../containers/history/History'
import Operate from '../containers/operate/Operate'
import Create from '../containers/create/Create'
import { NotFound } from '../containers/notfound/NotFound'
import OrderForm from './components/OrderForm'
import OrderPage from '../containers/orders/OrderPage'
import Orders from '../containers/orders/Orders'

// Routes
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={History} />
      <Route exact path="/orders" component={Orders} />
      <Route path="/orders/:orderId" component={OrderPage} />
      <Route path="/operate" component={Operate} />
      <Route exact path="/create" component={Create} />
      <Route path="/create/:orderType" component={OrderForm} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
