import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const useApolloClient = () => {
  const authLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        "X-GraphQL-Method": "Query",
      },
    }
  })

  const link = authLink.concat(
    createHttpLink({
      uri: `https://ericgraphql.dictybase.dev/graphql`,
      credentials: "include",
    }),
  )

  const cache = new InMemoryCache()

  return new ApolloClient({
    cache,
    link,
  })
}

export default useApolloClient
