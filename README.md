# react-relay-todo-example

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Relay](https://facebook.github.io/relay/): Powerful GraphQL client developed by Facebook
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

## Example ([Live demo](https://demo-react-relay-todo-example.netlify.com) & [GraphQL Playground](https://api.graph.cool/relay/v1/cj1nq71xyfabv0199bp3a7hhf))

![](http://imgur.com/75LEao7.gif)

## Quickstart

For more information on how to get started [refer to the full react-relay-todo tutorial](https://www.graph.cool/docs/quickstart/react-relay-todo-example).

### 1. Clone example repository

```sh
git clone https://github.com/graphcool-examples/react-relay-todo-example.git
cd react-relay-todo-example
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Todo schema
graphcool init --url graph.cool/schema/todo 
```

This creates a GraphQL API for the following schema:

```graphql
type Todo {
  text: String!
  complete: Boolean!
}
```

### 3. Connect the app with your GraphQL API

Copy the `Relay API` endpoint to `./src/app.js` as the argument for the constructor of `Relay.DefaultNetworkLayer`, replacing `__RELAY_API_ENDPOINT__ `:

```js
// replace `__RELAY_API_ENDPOINT__ ` with the endpoint from the previous step
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('__RELAY_API_ENDPOINT__')
);
```

Further, open `package.json` and paste the endpoint as the value for the `url` key, again replacing `__RELAY_API_ENDPOINT__ `:

```js
"graphql": {
  "request": {
    "url": "__RELAY_API_ENDPOINT__"
  }
},
```

### 4. Install depdendencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Advanced GraphQL features](x)
* [Authentication & Permissions](x)
* [Implementing business logic with serverless functions](x)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
