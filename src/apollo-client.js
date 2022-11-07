import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://devoted-doe-46.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "YwoD4wC2ueyRS9yPB2vjnc1HTIOLdUKR2oERYjT53617oryllmXmVNYn8wU4qctk",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://devoted-doe-46.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "YwoD4wC2ueyRS9yPB2vjnc1HTIOLdUKR2oERYjT53617oryllmXmVNYn8wU4qctk",
      },
    },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
