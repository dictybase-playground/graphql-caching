import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import StrainsWithPhenotypeListDisplay from "./StrainsWithPhenotypeListDisplay"
import { GET_STRAIN_LIST_WITH_PHENOTYPE } from "./graphql/queries"

const useStyles = makeStyles({
  totalCount: {
    position: "sticky",
    top: 0,
  },
})

// remove "+" from phenotype params to get the proper name
// i.e. "abolished+protein+phosphorylation" = "abolished protein phosphorylation"
const cleanQuery = (phenotype: string) => phenotype.split("+").join(" ")

type Params = {
  /** Phenotype name from URL */
  name: string
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
      variables: {
        cursor: 0,
        limit: 50,
        type: "phenotype",
        annotation: phenotype,
      },
      errorPolicy: "all",
      // fetchPolicy: "cache-and-network",
    },
  )

  const loadMoreItems = async () => {
    const newCursor = data.listStrainsWithAnnotation.nextCursor
    // need to check for same cursor to prevent extra fetching
    // https://github.com/apollographql/apollo-client/issues/5901
    if (newCursor === prevCursor || newCursor === 0) {
      return
    }
    setPrevCursor(newCursor)
    setIsLoadingMore(true)
    const res: any = await fetchMore({
      variables: {
        cursor: data.listStrainsWithAnnotation.nextCursor,
        limit: 50,
        type: "phenotype",
        annotation: phenotype,
      },
    })
    if (res.data) {
      setIsLoadingMore(false)
    }
    if (res.data.listStrainsWithAnnotation.nextCursor === 0) {
      setHasMore(false)
    }
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

const StrainsWithPhenotype = () => {
  const classes = useStyles()
  const { name } = useParams<Params>()
  const phenotype = cleanQuery(name)
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

  const { totalCount, strains } = data.listStrainsWithAnnotation

  return (
    <div>
      <div className={classes.totalCount}>
        got {totalCount} items for {phenotype}
      </div>
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
