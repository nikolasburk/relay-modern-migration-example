import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'
import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import environment from './createRelayEnvironment'
import './style.css'

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