'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://react-radio.onrender.com/api/graphql',
  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: any }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
