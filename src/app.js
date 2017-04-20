import React from 'react'
import Relay, {
  Route,
  RootContainer,
} from 'react-relay/classic'
import ReactDOM from 'react-dom'
// import {
//   Router,
//   IndexRoute,
//   // Route,
//   browserHistory,
//   applyRouterMiddleware,
// } from 'react-router'
// import useRelay from 'reac lay'
import TodoApp from './components/TodoApp'
// import TodoList from './components/TodoList'
// import ViewerQueries from './queries/ViewerQueries'

import './style.css'

class ViewerRoute extends Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  }
  static routeName = 'ViewerRoute'
}

// Paste your endpoint for the Relay API here.
// Info: https://github.com/graphcool-examples/react-relay/classic-todo-example#2-create-graphql-api-with-graphcool
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/cj1nq71xyfabv0199bp3a7hhf')
)

ReactDOM.render(
  <Relay.RootContainer
    Component={TodoApp}
    route={new ViewerRoute()}
    renderFetched={(data) => {
      return (
        <TodoApp
          {...data}
        />
      )
    }}
    renderLoading={() => <div>Loading</div>}
    renderFailure={(error) => <div>{error}</div>}
  />,
  document.getElementById('root')
)

// ReactDOM.render(
//   <Router
//     forceFetch
//     environment={Relay.Store}
//     render={applyRouterMiddleware(useRelay)}
//     history={browserHistory}
//   >
//     <Route
//       path='/' component={TodoApp}
//       queries={ViewerQueries}>
//       <IndexRoute
//         component={TodoList}
//         queries={ViewerQueries}
//         prepareParams={() => ({status: 'any'})}
//       />
//       <Route
//         path=':status' component={TodoList}
//         queries={ViewerQueries}
//       />
//     </Route>
//   </Router>,
//   document.getElementById('root')
// )
