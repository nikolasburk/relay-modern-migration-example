import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import Relay from 'react-relay';

class TodoApp extends React.Component {
  _handleTextInputSave = (text) => {
    Relay.Store.commitUpdate(
      new AddTodoMutation({text, viewer: this.props.viewer})
    );
  };
  _handleMarkAll() {
    const numRemainingTodos = this.props.viewer.allTodos.edges.filter(x => !x.node.complete).length;
    const newStatus = numRemainingTodos === 0 ? false : true;

    console.log('newStatus', newStatus)

    this.props.viewer.allTodos.edges
    .map(x => x.node)
    .filter(x => x.complete !== newStatus)
    .forEach((todo) =>{
      Relay.Store.commitUpdate(
        new ChangeTodoStatusMutation({
          complete: newStatus,
          todo: todo,
          viewer: this.props.viewer,
        })
      )
    })
  }
  render() {
    const hasTodos = this.props.viewer.allTodos.edges.length > 0;
    const numRemainingTodos = this.props.viewer.allTodos.edges.filter(x => !x.node.complete).length;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
            <input onClick={() => this._handleMarkAll()} type="checkbox" checked={numRemainingTodos === 0} className="toggle-all" readOnly/>
            <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>

          {this.props.children}

          {hasTodos &&
            <TodoListFooter
              todos={this.props.viewer.todos}
              viewer={this.props.viewer}
            />
          }
        </section>
        <footer className="info">
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by the <a href="https://facebook.github.io/relay/">
              Relay team
            </a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  prepareVariables() {
    return {
      limit: 2147483647,  // GraphQLInt
    };
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allTodos(first: $limit) {
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
        ${TodoListFooter.getFragment('viewer')},
      }
    `,
  },
});
