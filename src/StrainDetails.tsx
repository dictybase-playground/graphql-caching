import React from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { GET_STRAIN } from "./queries/queries"

const useStyles = makeStyles({
  strain: {
    paddingBottom: "20px",
  },
})

type Params = {
  /** Stock ID from URL */
  id: string
}

const StrainDetails = () => {
  const { id } = useParams<Params>()
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_STRAIN, {
    variables: {
      id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <div className={classes.strain}>
        {Object.entries(data.strain).map(([key, val]) => (
          <div key={key}>{`${key}: ${val}`}</div>
        ))}
      </div>
    </div>
  )
}

export default StrainDetails
