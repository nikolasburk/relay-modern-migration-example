import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import {
  Router,
  IndexRoute,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router'
import useRelay from 'react-router-relay'
import TodoApp from './components/TodoApp'
import TodoList from './components/TodoList'
import ViewerQueries from './queries/ViewerQueries'

import './style.css'

// The x-graphcool-source header is to let the server know that the example app has started.
// (Not necessary for normal projects)
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/regalsnake-lynx-593', {
    headers: {
      'x-graphcool-source': 'example:react-relay-todo',
    },
  }))

ReactDOM.render(
  <Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
  >
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
  </Router>,
  document.getElementById('root')
)
