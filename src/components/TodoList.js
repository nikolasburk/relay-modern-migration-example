import Todo from './Todo'
import React, { PropTypes } from 'react'
import Relay from 'react-relay'

class TodoList extends React.Component {

  static propTypes = {
    viewer: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  filterTodos = (edge) => (
    this.props.params.status === 'active'
    ? edge.node.complete !== true
    : this.props.params.status === 'completed'
      ? edge.node.complete === true
      : true
    )

  renderTodos () {
    return this.props.viewer.allTodoes.edges
      .filter(this.filterTodos)
      .reverse()
      .map((edge) =>
        <Todo
          key={edge.node.id}
          todo={edge.node}
          viewer={this.props.viewer}
        />
      )
  }

  render () {
    return (
      <section className='main'>
        <ul className='todo-list'>
          {this.renderTodos()}
        </ul>
      </section>
    )
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    status: null,
    limit: 2147483647,
  },

  prepareVariables ({ status }) {
    var nextStatus
    if (status === 'active' || status === 'completed') {
      nextStatus = status
    } else {
      // This matches the Backbone example, which displays all todos on an
      // invalid route.
      nextStatus = 'any'
    }
    return {
      status: nextStatus,
      limit: 2147483647,  // GraphQLInt
    }
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allTodoes(first: $limit) {
          edges {
            node {
              id,
              complete,
              ${Todo.getFragment('todo')},
            },
          },
        },
        ${Todo.getFragment('viewer')},
      }
    `,
  },
})
