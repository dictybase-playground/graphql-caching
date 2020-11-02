import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useIntersectionObserver } from "dicty-hooks"
import { StrainWithPhenotype } from "./types/types"

const useStyles = makeStyles({
  list: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  loading: {
    textAlign: "center",
    marginTop: "15px",
  },
})

type Props = {
  /** Array of strains with given phenotype */
  data: Array<any>
  /** Function to load more data */
  loadMore: () => void
  /** Indicator for having more content */
  hasMore: boolean
  /** Indicator to determine if more data is being loaded */
  isLoadingMore: boolean
}

/**
 * StrainsWithPhenotypeListDisplay is used to display a list of phenotypes.
 */

const StrainsWithPhenotypeListDisplay = ({
  data,
  loadMore,
  hasMore,
  isLoadingMore,
}: Props) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const visible = useIntersectionObserver({
    ref: targetRef,
    hasMore,
  })
  const classes = useStyles()

  React.useEffect(() => {
    if (visible && hasMore) {
      loadMore()
    }
  }, [hasMore, loadMore, visible])

  return (
    <React.Fragment>
      <Paper>
        <List className={classes.list}>
          {data.map((item: StrainWithPhenotype, index: number) => {
            const key = `${index}-${item.id}`
            return (
              <ListItem key={key}>
                {index}) {item.id}: {item.label}
              </ListItem>
            )
          })}
          <div ref={targetRef} />
        </List>
      </Paper>
      {isLoadingMore && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  )
}

export default StrainsWithPhenotypeListDisplay
