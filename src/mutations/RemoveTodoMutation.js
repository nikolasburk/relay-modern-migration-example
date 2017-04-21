import {commitMutation, graphql} from 'react-relay'

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

function getOptimisticResponse (todoId, viewerId) {
  return {
    deletedId: todoId,
    viewer: {id: viewerId},
  }
}

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
      optimisticResponse: () => getOptimisticResponse(todoId, viewerId),
    }
  )
}

export default {commit}

