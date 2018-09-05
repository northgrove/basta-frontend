import React from 'react'
import { Route, Switch, Layout } from 'react-router'

import History from '../containers/history/History'
import Operate from '../containers/operate/Operate'
import Create from '../containers/create/Create'
import { NotFound } from '../containers/notfound/NotFound'
import OrderForm from './components/OrderForm'
import OrderDetails from '../containers/order/OrderDetails'
import Order from '../containers/order/Order'

// Routes
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={History} />
      <Route exact path="/order" component={Order} />
      <Route path="/orders/:orderId" component={OrderDetails} />
      <Route path="/operate" component={Operate} />
      <Route exact path="/create" component={Create} />
      <Route path="/create/:orderType" component={OrderForm} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
