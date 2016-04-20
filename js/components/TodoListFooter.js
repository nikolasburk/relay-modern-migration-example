import {IndexLink, Link} from 'react-router';

import React from 'react';
import Relay from 'react-relay';

class TodoListFooter extends React.Component {
  render() {
    var numRemainingTodos = this.props.viewer.allTodos.edges.filter(x => !x.node.complete).length;;// this.props.viewer.totalCount - numCompletedTodos;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numRemainingTodos}</strong> item{numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className="filters">
          <li>
            <IndexLink to="/" activeClassName="selected">All</IndexLink>
          </li>
          <li>
            <Link to="/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Relay.createContainer(TodoListFooter, {
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
              id,
              complete
            },
          },
        }
      }
    `,
  },
});
