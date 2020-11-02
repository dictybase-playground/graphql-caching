import React from "react"
import { useQuery } from "@apollo/client"
import { GET_STRAIN } from "./queries/queries"

const StrainDetails = () => {
  const { loading, error, data } = useQuery(GET_STRAIN, {
    variables: {
      id: "DBS0351367",
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {Object.entries(data.strain).map(([key, val]) => (
        <div key={key}>{`${key}: ${val}`}</div>
      ))}
    </div>
  )
}

export default StrainDetails
