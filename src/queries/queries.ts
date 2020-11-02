import { gql } from "@apollo/client"

const GET_STRAIN_LIST_WITH_PHENOTYPE = gql`
  query ListStrainsWithPhenotype(
    $cursor: Int!
    $limit: Int!
    $phenotype: String!
  ) {
    listStrainsWithPhenotype(
      cursor: $cursor, limit: $limit, phenotype: $phenotype
    ) {
      totalCount
      nextCursor
      strains {
        id
        label
        genes
        publications {
          id
          pub_date
          title
          journal
          volume
          pages
          authors {
            last_name
          }
        }
      }
    }
  }
`

const GET_STRAIN = gql`
  query Strain($id: ID!) {
    strain(id: $id) {
      id
      label
      summary
      species
      depositor
      plasmid
      dbxrefs
      genes
      in_stock
      systematic_name
      genotypes
      mutagenesis_method
      genetic_modification
      names
      characteristics
    }
  }
`

export {GET_STRAIN_LIST_WITH_PHENOTYPE, GET_STRAIN}