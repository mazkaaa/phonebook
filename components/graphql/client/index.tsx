import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/',
  cache: new InMemoryCache(),
});

export default client;