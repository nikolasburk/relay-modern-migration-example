import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import AddTodoMutation from '../mutations/AddTodoMutation'
import TodoTextInput from './TodoTextInput'
import TodoList from './TodoList'

class TodoApp extends React.Component {

  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  _handleTextInputSave = (text) => {
    Relay.Store.commitUpdate(
      new AddTodoMutation({text, viewer: this.props.viewer})
    )
  }

  _handleMarkAll = () => {
    const numRemainingTodos = this.props.viewer.allTodoes.edges.filter((x) => !x.node.complete).length
    const newStatus = numRemainingTodos !== 0

    this.props.viewer.allTodoes.edges
    .map((x) => x.node)
    .filter((x) => x.complete !== newStatus)
    .forEach((todo) => {
      Relay.Store.commitUpdate(
        new ChangeTodoStatusMutation({
          complete: newStatus,
          todo: todo,
          viewer: this.props.viewer,
        })
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

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allTodoes(first: 1000) {
          edges {
            node {
              ${ChangeTodoStatusMutation.getFragment('todo')},
              id,
              complete
            }
          }
        },
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${AddTodoMutation.getFragment('viewer')},
        ${TodoList.getFragment('viewer')}
      }
    `,
  },
})
