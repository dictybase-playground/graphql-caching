type StrainWithPhenotype = {
  id: string
  label: string
  genes: Array<string>
  publications: Array<any>
}

type ListStrainsWithPhenotype = {
  listStrainsWithPhenotype: {
    /** Typename given by Apollo Client ("StrainListWithCursor") */
    __typename: string
    /** Cursor used to fetch next set of items */
    nextCursor: number
    /** Total count of strains returned from query */
    totalCount: number
    /** Array of strain data */
    strains: Array<StrainWithPhenotype>
  }
}

export type { StrainWithPhenotype, ListStrainsWithPhenotype }