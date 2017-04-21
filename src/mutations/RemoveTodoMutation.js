// var Relay = require('react-relay/classic')
const {commitMutation, graphql} = require('react-relay')

const mutation = graphql`
  mutation RemoveTodoMutation(
    $input: DeleteTodoInput!
  ) {
    deleteTodo(input: $input) {
      todo {
        id
      }
      viewer {
        id
        allTodoes(last: 1000) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`

function getConfigs(viewerId) {
  return [{
    type: 'NODE_DELETE',
    parentName: 'viewer',
    parentID: viewerId,
    connectionName: 'allTodoes',
    deletedIDFieldName: 'deletedId',
  }]
}

function commit(environment, todoId, viewerId) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {input: { id: todoId, clientMutationId: 'asd' }},
      configs: getConfigs(viewerId),
    }
  )
}

export default {commit}


// export default class RemoveTodoMutation extends Relay.Mutation {
//   static fragments = {
//     // TODO: Mark complete as optional
//     todo: () => Relay.QL`
//       fragment on Todo {
//         complete,
//         id,
//       }
//     `,
//     // TODO: Mark completedCount and totalCount as optional
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         id,
//       }
//     `,
//   }
//   getMutation () {
//     return Relay.QL`mutation{deleteTodo}`
//   }
//   getFatQuery () {
//     return Relay.QL`
//       fragment on DeleteTodoPayload {
//         todo {
//           id
//         },
//         viewer {
//           allTodoes
//         }
//       }
//     `
//   }
//   getConfigs () {
//     return [{
//       type: 'NODE_DELETE',
//       parentName: 'viewer',
//       parentID: this.props.viewer.id,
//       connectionName: 'allTodoes',
//       deletedIDFieldName: 'deletedId',
//     }]
//   }
//   getVariables () {
//     return {
//       id: this.props.todo.id,
//     }
//   }
//   getOptimisticResponse () {
//     return {
//       deletedId: this.props.todo.id,
//       todo: { id: this.props.todo.id },
//       viewer: {id: this.props.viewer.id},
//     }
//   }
// }
