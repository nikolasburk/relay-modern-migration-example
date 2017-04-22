import React from 'react'
import Relay, {
  Route,
  RootContainer,
} from 'react-relay'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'

import './style.css'

class ViewerRoute extends Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  }
  static routeName = 'ViewerRoute'
}

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
