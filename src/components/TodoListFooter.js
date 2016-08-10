import {IndexLink, Link} from 'react-router'
import React, { PropTypes } from 'react'
import Relay from 'react-relay'
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
      Relay.Store.commitUpdate(
        new RemoveTodoMutation({todo: todo, viewer: this.props.viewer})
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

export default Relay.createContainer(TodoListFooter, {
  initialVariables: {
    limit: 2147483647,
  },

  prepareVariables () {
    return {
      limit: 2147483647,  // GraphQLInt
    }
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${RemoveTodoMutation.getFragment('viewer')},
        allTodoes(first: $limit) {
          edges {
            node {
              id,
              complete,
              ${RemoveTodoMutation.getFragment('todo')}
            },
          },
        }
      }
    `,
  },
})
