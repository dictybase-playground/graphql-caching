import React from "react"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Routes from "./Routes"
import useApolloClient from "./hooks/useApolloClient"

const useStyles = makeStyles({
  container: {
    paddingTop: "20px",
    "& a": {
      paddingRight: "15px",
    },
  },
  navbar: {
    marginBottom: "20px",
  },
})

const App = () => {
  const client = useApolloClient()
  const classes = useStyles()

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container maxWidth="md" className={classes.container}>
          <div>
            <strong>Strain Details: </strong>
            <Link to="/strains/DBS0351367">DBS0351367</Link>
            <Link to="/strains/DBS0349879">DBS0349879</Link>
          </div>
          <div className={classes.navbar}>
            <strong>Strains With Phenotype: </strong>
            <Link to="/phenotypes/aberrant+aggregation">
              aberrant aggregation
            </Link>
            <Link to="/phenotypes/decreased+growth+rate">
              decreased growth rate
            </Link>
            <Link to="/phenotypes/abolished+protein+phosphorylation">
              abolished protein phosphorylation
            </Link>
          </div>
          <Routes />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
