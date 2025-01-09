import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
    // uri: "https://whats-menu-server.vercel.app/api",
    uri: "http://localhost:5005/api",
    cache: new InMemoryCache(),
});

export default client;