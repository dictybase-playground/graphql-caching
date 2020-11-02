import React from "react"
import { useQuery } from "@apollo/client"
import StrainsWithPhenotypeListDisplay from "./StrainsWithPhenotypeListDisplay"
import { GET_STRAIN_LIST_WITH_PHENOTYPE } from "./queries/queries"
import { ListStrainsWithPhenotype } from "./types/types"

/**
 * updateListData is used to return merged data
 */
const updateListData = (
  setIsLoadingMore: (arg0: boolean) => void,
  setHasMore: (arg0: boolean) => void,
  previousResult: ListStrainsWithPhenotype,
  fetchMoreResult?: ListStrainsWithPhenotype,
) => {
  setIsLoadingMore(false)
  if (!fetchMoreResult) return previousResult

  const {
    strains: newStrains,
    nextCursor: newCursor,
    totalCount,
    __typename,
  } = fetchMoreResult.listStrainsWithPhenotype
  const previousStrains = previousResult.listStrainsWithPhenotype.strains

  const mergedStrains = [...previousStrains, ...newStrains]

  if (newCursor === 0) {
    setHasMore(false)
  }

  return {
    listStrainsWithPhenotype: {
      nextCursor: newCursor,
      totalCount: totalCount,
      strains: [...new Set(mergedStrains)], // remove any duplicate entries
      __typename: __typename,
    },
  }
}

/**
 * Custom hook to handle all fetching/refetching logic
 * */
const useListStrainsWithPhenotype = (phenotype: string) => {
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [prevCursor, setPrevCursor] = React.useState(null)
  const { loading, error, data, fetchMore } = useQuery(
    GET_STRAIN_LIST_WITH_PHENOTYPE,
    {
      variables: { cursor: 0, limit: 50, phenotype },
      errorPolicy: "all",
    },
  )

  const loadMoreItems = async () => {
    const newCursor = data.listStrainsWithPhenotype.nextCursor
    if (newCursor === prevCursor || newCursor === 0) {
      return
    }
    setPrevCursor(newCursor)
    setIsLoadingMore(true)
    await fetchMore({
      variables: {
        cursor: newCursor,
        limit: 50,
        phenotype,
      },
      updateQuery: (
        previousResult: ListStrainsWithPhenotype,
        { fetchMoreResult }: { fetchMoreResult?: ListStrainsWithPhenotype },
      ) =>
        updateListData(
          setIsLoadingMore,
          setHasMore,
          previousResult,
          fetchMoreResult,
        ),
    })
  }

  return {
    loading,
    error,
    data,
    loadMoreItems,
    hasMore,
    isLoadingMore,
  }
}

type Props = {
  phenotype: string
}

const StrainsWithPhenotype = ({ phenotype }: Props) => {
  const {
    loading,
    error,
    data,
    loadMoreItems,
    hasMore,
    isLoadingMore,
  } = useListStrainsWithPhenotype(phenotype)

  if (loading) return <p>Loading...</p>
  if (error && !data) return <p>Error :(</p>

  const { totalCount, strains } = data.listStrainsWithPhenotype

  return (
    <div>
      got {totalCount} items for {phenotype} on this request
      <StrainsWithPhenotypeListDisplay
        loadMore={loadMoreItems}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        data={strains}
      />
    </div>
  )
}

export default StrainsWithPhenotype
