import React, { PropTypes } from 'react'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import CreateTodoMutation from '../mutations/CreateTodoMutation'
import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

class TodoApp extends React.Component {

  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  _handleTextInputSave = (text) => {
    CreateTodoMutation.commit(
      this.props.relay.environment,
      text,
      false,
      this.props.viewer.id
    )
  }

  _handleMarkAll = () => {
    const numRemainingTodos = this.props.viewer.allTodoes.edges.filter((x) => !x.node.complete).length
    const newStatus = numRemainingTodos !== 0
    this.props.viewer.allTodoes.edges
    .map((x) => x.node)
    .filter((x) => x.complete !== newStatus)
    .forEach((todo) => {
      ChangeTodoStatusMutation.commit(
        this.props.relay.environment,
        complete,
        todo,
        this.props.viewer.id
      )
    })
  }

  render () {
    const numRemainingTodos = this.props.viewer.allTodoes.edges.filter((x) => !x.node.complete).length
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>
              todos
            </h1>
            <input
              onClick={this._handleMarkAll}
              type='checkbox'
              checked={numRemainingTodos === 0}
              className='toggle-all'
              readOnly
            />
            <TodoTextInput
              autoFocus
              className='new-todo'
              onSave={this._handleTextInputSave}
              placeholder='What needs to be done?'
            />
          </header>

          <TodoList
            viewer={this.props.viewer}
            params={{
              status: 'all',
            }}
          />
        </section>
        <footer className='info'>
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by the <a href='https://facebook.github.io/relay/'>
              Relay team
            </a>
          </p>
          <p>
            Part of <a href='http://todomvc.com'>TodoMVC</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on Viewer {
      id
      allTodoes(last: 1000) {
        edges {
          node {
            id,
            complete
          }
        }
      },
      ...TodoList_viewer
    }
  `,
})
