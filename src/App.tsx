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
  },
  navbar: {
    marginBottom: "20px",
    "& a": {
      paddingRight: "15px",
    },
  },
})

const App = () => {
  const client = useApolloClient()
  const classes = useStyles()

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.navbar}>
            <Link to="/strain-details">Strain Details</Link>
            <Link to="/strains-with-phenotype">Strains With Phenotype (1)</Link>
            <Link to="/strains-with-phenotype-2">
              Strains With Phenotype (2)
            </Link>
          </div>
          <Routes />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
