import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { StrainWithPhenotype } from "../types/types"

type ListStrainsWithPhenotype = {
  strains: Array<StrainWithPhenotype>
  nextCursor: number
  totalCount: number
  __typename: string
}

const listStrainsWithPhenotypePagination = () => ({
  keyArgs: ["phenotype"],
  merge(
    existing: ListStrainsWithPhenotype,
    incoming: ListStrainsWithPhenotype,
  ) {
    let strains: ListStrainsWithPhenotype["strains"] = []
    let totalCount: ListStrainsWithPhenotype["totalCount"] = 0
    if (existing && existing.strains) {
      strains = strains.concat(existing.strains)
      totalCount = existing.totalCount
    }
    if (incoming && incoming.strains) {
      strains = strains.concat(incoming.strains)
      totalCount = totalCount + incoming.totalCount
    }
    return {
      ...incoming,
      strains,
      totalCount,
    }
  },
  read(existing: ListStrainsWithPhenotype) {
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
          listStrainsWithPhenotype: listStrainsWithPhenotypePagination(),
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
