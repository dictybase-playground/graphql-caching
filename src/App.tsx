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
            <Link to="/strain-details">DBS0351367</Link>
            <Link to="/strain-details-2">DBS0349879</Link>
          </div>
          <div className={classes.navbar}>
            <strong>Strains With Phenotype: </strong>
            <Link to="/strains-with-phenotype">aberrant aggregation</Link>
            <Link to="/strains-with-phenotype-2">decreased growth rate</Link>
          </div>
          <Routes />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
