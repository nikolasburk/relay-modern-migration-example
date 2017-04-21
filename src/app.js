import React from 'react'
// import Relay, {
//   Route,
//   RootContainer,
// } from 'react-relay/classic'
// import RelayClassic from 'react-relay/classic'
import {
  Router,
  IndexRoute,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'
import TodoList from './components/TodoList'
import useRelay from 'react-router-relay'
const {
  QueryRenderer,
  graphql,
} = require('react-relay') // or require('react-relay/compat') for compatibility
import environment from './createRelayEnvironment'
import ViewerQueries from './queries/ViewerQueries'

import './style.css'

// Paste your endpoint for the Relay API here.
// Info: https://github.com/graphcool-examples/react-relay/classic-todo-example#2-create-graphql-api-with-graphcool
// Relay.injectNetworkLayer(
//   new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/cj1nq71xyfabv0199bp3a7hhf')
// )

// const root = <Relay.RootContainer
//   Component={TodoApp}
//   route={new ViewerRoute()}
//   renderFetched={(data) => {
//     return (
//       <TodoApp
//         {...data}
//       />
//     )
//   }}
//   renderLoading={() => <div>Loading</div>}
//   renderFailure={(error) => <div>{error}</div>}
// />

const root = <QueryRenderer
  environment={environment}
  query={graphql`
    query appQuery {
      viewer {
        ...TodoApp_viewer
      }
    }
  `}
  render={({error, props}) => {
    if (props) {
      return <TodoApp viewer={props.viewer} />
    } else {
      return <div>Loading</div>
    }
  }}
/>

ReactDOM.render(
  root,
  document.getElementById('root')
)
//
// ReactDOM.render(
//   <Router
//     forceFetch
//     environment={environment}
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
