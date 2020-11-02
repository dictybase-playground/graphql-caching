import React from "react"
import { useQuery } from "@apollo/client"
import { GET_STRAIN_LIST_WITH_PHENOTYPE } from "./queries/queries"

type Props = {
  phenotype: string
}

const StrainsWithPhenotype = ({ phenotype }: Props) => {
  const { loading, error, data } = useQuery(GET_STRAIN_LIST_WITH_PHENOTYPE, {
    variables: {
      cursor: 0,
      limit: 20,
      phenotype,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { totalCount, strains } = data.listStrainsWithPhenotype

  return (
    <div>
      got first {totalCount} items for {phenotype}
      <br />
      {strains.map((item: any, index: number) => (
        <div key={index}>
          {item.id}: {item.label}
        </div>
      ))}
    </div>
  )
}

export default StrainsWithPhenotype
