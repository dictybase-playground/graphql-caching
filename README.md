# graphql-caching

This is a demo app to show caching techniques with GraphQL, specifically with infinite list queries.

For infinite scroll pages, the previous way to handle the caching of continuous list queries was to
use the `updateQuery` method attached to the `fetchMore` query. An example:

```jsx
fetchMore({
  query: GET_STRAIN_LIST_WITH_PHENOTYPE,
  variables: {
    cursor: data.listStrainsWithAnnotation.nextCursor,
    limit: 50,
    type: "phenotype",
    annotation: "abolished protein phosphorylation",
  },
  updateQuery: (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) return previousResult
    const previousStrains = previousResult.listStrainsWithAnnotation.strains
    const newStrains = fetchMoreResult.listStrainsWithAnnotation.strains
    const newCursor = fetchMoreResult.listStrainsWithAnnotation.nextCursor
    const allStrains = [...previousStrains, ...newStrains]

    return {
      listStrainsWithAnnotation: {
        nextCursor: newCursor,
        totalCount: fetchMoreResult.listStrainsWithAnnotation.totalCount,
        strains: allStrains,
        __typename: previousResult.listStrainsWithAnnotation.__typename,
      },
    }
  },
})
```

With Apollo Client V3, the `updateQuery` method became deprecated. The new way to handle
[pagination caching](https://www.apollographql.com/docs/react/pagination/core-api/) is to add new
`typePolicies` to the `InMemoryCache`. Example:

```jsx
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listStrainsWithAnnotation: {
          keyArgs: ["type", "annotation"],
          merge(existing, incoming) {
            let strains = []
            let totalCount = 0
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
        },
      },
    },
  },
})
```

In the above example we are using the key arguments of `type` and `annotation` to create
a unique cache identifier for each different list query. If there is incoming data, the
incoming strains are merged with the existing strains into the same cache object. The total
count is also increased to give a combined number as new items are retrieved.

In this web app, there are demos of strain details queries and demos of listing strains with a given phenotype.
For the details queries, we do not need to define a custom type policy because the cache key is
automatically generated by the format of `__typename:id` (i.e. `Strain:DBS0351367`).
