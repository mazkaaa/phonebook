import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../components/graphql/client'
import ContextProvider from '../components/context'
import Layout from '../components/layouts'

export const config = { amp: true }

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
