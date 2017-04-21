import {IndexLink, Link} from 'react-router'
import React, { PropTypes } from 'react'
var {
  createFragmentContainer,
  graphql,
} = require('react-relay')
// import Relay from 'react-relay/classic'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'

class TodoListFooter extends React.Component {

  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  _handleRemoveCompletedTodosPress = () => {
    const completedTodos = this.props.viewer.allTodoes.edges
    .map((x) => x.node)
    .filter((x) => x.complete)

    completedTodos.forEach((todo) => {
      // Relay.Store.commitUpdate(
      //   new RemoveTodoMutation({todo: todo, viewer: this.props.viewer})
      // )
      RemoveTodoMutation.commit(
        this.props.relay.environment,
        todo.id,
        this.props.viewer.id
      )
    })
  }

  render () {
    const numRemainingTodos = this.props.viewer.allTodoes.edges.filter((x) => !x.node.complete).length
    const numCompletedTodos = this.props.viewer.allTodoes.edges.filter((x) => x.node.complete).length
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{numRemainingTodos}</strong> item{numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className='filters'>
          <li>
            <IndexLink to='/' activeClassName='selected'>All</IndexLink>
          </li>
          <li>
            <Link to='/active' activeClassName='selected'>Active</Link>
          </li>
          <li>
            <Link to='/completed' activeClassName='selected'>Completed</Link>
          </li>
        </ul>
        {numCompletedTodos > 0 &&
          <span onClick={this._handleRemoveCompletedTodosPress} className='clear-completed'>
            Clear completed
          </span>
        }
      </footer>
    )
  }
}

export default createFragmentContainer(TodoListFooter, {
  viewer: graphql`
    fragment TodoListFooter_viewer on Viewer {
#      ...RemoveTodoMutation_viewer,
      allTodoes(first: 1000) {
        edges {
          node {
            id,
            complete,
#            ...RemoveTodoMutation_todo
          },
        },
      }
    }
  `,
})
