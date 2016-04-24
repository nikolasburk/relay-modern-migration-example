import { IndexRoute, Route } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { RelayRouter } from 'react-router-relay'
import Relay from 'react-relay'
import TodoApp from './components/TodoApp'
import TodoList from './components/TodoList'
import ViewerQueries from './queries/ViewerQueries'
import { browserHistory } from 'react-router'

import './style.css'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/__PROJECT_ID__')
)

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route
      path='/' component={TodoApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={TodoList}
        queries={ViewerQueries}
        prepareParams={() => ({status: 'any'})}
      />
      <Route
        path=':status' component={TodoList}
        queries={ViewerQueries}
      />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
)
