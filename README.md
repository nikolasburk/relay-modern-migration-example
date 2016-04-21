# react-relay-todo-example

:memo: [Todo](http://todomvc.com/) example app built with [React](https://facebook.github.io/react) & [Relay](https://facebook.github.io/relay)

## Getting Started

After [downloading this example](https://github.com/graphcool-examples/react-relay-todo-example/archive/master.zip) please follow these steps.

### 1. Create an account

To run this example, please create a [graph.cool](http://graph.cool) account in order to **get your Relay endpoint**. This shouldn't take longer than 30 seconds. We promise!

Here is an example endpoint: `https://api.graph.cool/relay/v1/__YOUR_PROJECT_ID__ `


### 2. Configure app data endpoint

Open `js/app.js` and paste your new endpoint to the line containing `new Relay.DefaultNetworkLayer()`. It should now look like this:

```js
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/__YOUR_PROJECT_ID__')
);
```

### 3. Configure build schema endpoint

Open `package.json` and set the GraphQL schema url to your schema endpoint. This is based on [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay). Here is how it should look like:

```json
"react-relay-schema": "https://api.graph.cool/relay/v1/__YOUR_PROJECT_ID__/schema.json"
```

### 4. Run the example

That's all needed in order to run this example. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser.

```sh
npm install
npm start
```


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!
