import React from "react"
import { useQuery } from "@apollo/client"
import { makeStyles } from "@material-ui/core/styles"
import { GET_STRAIN } from "./queries/queries"

const useStyles = makeStyles({
  strain: {
    paddingBottom: "20px",
  },
})

type Props = {
  id: string
}

const StrainDetails = ({ id }: Props) => {
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
