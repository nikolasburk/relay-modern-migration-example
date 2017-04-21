import {commitMutation, graphql} from 'react-relay'

const mutation = graphql`
  mutation RenameTodoMutation(
    $input: UpdateTodoInput!
  ) {
    updateTodo(input: $input) {
      todo {
        id
        text
      }
      edge {
        node {
          id
          text
        }
      }
      viewer {
        allTodoes(last: 1000) {
          edges {
            node {
              id
              text
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

function getOptimisticResponse (text, todoId, viewerId) {
  const viewerPayload = {id: viewerId}
  return {
    todo: {
      text,
      id: todoId,
    },
    viewer: viewerPayload,
  }
}

function commit(environment, todo, text, viewerId) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {input: { id: todo.id, text, complete: todo.complete, clientMutationId: 'asd' }},
      configs: getConfigs(viewerId),
      optimisticResponse: () => getOptimisticResponse(text, todo.id, viewerId),
    }
  )
}

export default {commit}