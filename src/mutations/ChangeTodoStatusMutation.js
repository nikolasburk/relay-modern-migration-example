import {commitMutation, graphql} from 'react-relay'

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
