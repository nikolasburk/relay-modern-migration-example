// var Relay = require('react-relay/classic')
const {commitMutation, graphql} = require('react-relay')

const mutation = graphql`
  mutation ChangeTodoStatusMutation(
    $input: UpdateTodoInput!
  ) {
    updateTodo(input: $input) {
      todo {
        id
        complete
      }
      edge {
        node {
          id
          complete
        }
      }
      viewer {
        allTodoes(last: 1000) {
          edges {
            node {
              id
              complete
            }
          }
        }
      }
    }
  }
`

function getConfigs(todoId, viewerId) {
  return [{
    type: 'FIELDS_CHANGE',
    fieldIDs: {
      todo: todoId,
      viewer: viewerId,
    },
  }]
}

function getOptimisticResponse (complete, todoId, viewerId) {
  const viewerPayload = {id: viewerId}
  return {
    todo: {
      complete,
      id: todoId,
    },
    viewer: viewerPayload,
  }
}

function commit(environment, todo, complete, viewerId) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {input: { id: todo.id, text: todo.text, complete, clientMutationId: 'asd' }},
      configs: getConfigs(viewerId),
      optimisticResponse: () => getOptimisticResponse(complete, todo.id, viewerId),
    }
  )
}

export default {commit}

// export default class ChangeTodoStatusMutation extends Relay.Mutation {
//   static fragments = {
//     todo: () => Relay.QL`
//       fragment on Todo {
//         id,
//         complete
//       }
//     `,
//     // TODO: Mark completedCount optional
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         id,
//       }
//     `,
//   }
//   getMutation () {
//     return Relay.QL`mutation{updateTodo}`
//   }
//   getFatQuery () {
//     return Relay.QL`
//       fragment on UpdateTodoPayload {
//         todo {
//           complete,
//         },
//         viewer {
//           allTodoes,
//         },
//       }
//     `
//   }
//   getConfigs () {
//     return [{
//       type: 'FIELDS_CHANGE',
//       fieldIDs: {
//         todo: this.props.todo.id,
//         viewer: this.props.viewer.id,
//       },
//     }]
//   }
//   getVariables () {
//     return {
//       complete: this.props.complete,
//       id: this.props.todo.id,
//     }
//   }
//   getOptimisticResponse () {
//     var viewerPayload = {id: this.props.viewer.id}
//     return {
//       todo: {
//         complete: this.props.complete,
//         id: this.props.todo.id,
//       },
//       viewer: viewerPayload,
//     }
//   }
// }
