import Todo from './Todo'
import React, { PropTypes } from 'react'
var {
  createFragmentContainer,
  graphql,
} = require('react-relay')

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

export default createFragmentContainer(TodoList, {
  viewer: graphql`
    fragment TodoList_viewer on Viewer {
      allTodoes(first: 1000) {
        edges {
          node {
            id,
            complete,
            ...Todo_todo,
          },
        },
      },
      ...Todo_viewer,
    }
  `,
})
