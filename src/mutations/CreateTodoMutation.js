const {commitMutation, graphql} = require('react-relay')

const mutation = graphql`
  mutation CreateTodoMutation(
    $input: CreateTodoInput!
  ) {
    createTodo(input: $input) {
      todo {
        id
        text
        complete
      }
      edge {
        node {
          id
          text
          complete
        }
      }
      viewer {
        allTodoes(last: 1000) {
          edges {
            node {
              id
              text
              complete
            }
          }
        }
      }
    }
  }
`

function getConfigs(viewerId) {
  return [{
    type: 'RANGE_ADD',
    parentName: 'viewer',
    parentID: viewerId,
    connectionName: 'allTodoes',
    edgeName: 'edge',
    rangeBehaviors: {
      '': 'append',
    },
  }]
}

function commit(environment, text, complete, viewerId) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {input: {text, complete, clientMutationId: 'asd'}},
      configs: getConfigs(viewerId)
    }
  )
}

export default {commit}

