import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { StrainWithPhenotype } from "../types/types"

type ListStrainsWithAnnotation = {
  strains: Array<StrainWithPhenotype>
  nextCursor: number
  totalCount: number
  __typename: string
}

const listStrainsWithAnnotationPagination = () => ({
  keyArgs: ["type", "annotation"],
  merge(
    existing: ListStrainsWithAnnotation,
    incoming: ListStrainsWithAnnotation,
  ) {
    let strains: ListStrainsWithAnnotation["strains"] = []
    let totalCount: ListStrainsWithAnnotation["totalCount"] = 0
    if (existing) {
      strains = strains.concat(existing.strains)
      totalCount = existing.totalCount
    }
    if (incoming) {
      strains = strains.concat(incoming.strains)
      totalCount = totalCount + incoming.totalCount
    }
    return {
      ...incoming,
      strains,
      totalCount,
    }
  },
  read(existing: ListStrainsWithAnnotation) {
    return existing
  },
})

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

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
        },
      },
    },
  })

  return new ApolloClient({
    cache,
    link,
  })
}

export default useApolloClient
