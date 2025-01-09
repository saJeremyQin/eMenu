import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://whats-menu-server.vercel.app/api",
    cache: new InMemoryCache(),
});

export default client;