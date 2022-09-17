import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import client from '../components/graphql/client'
import ContextProvider from '../components/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
