import React from "react"
import { Switch, Route } from "react-router-dom"
import StrainDetails from "./StrainDetails"
import StrainsWithPhenotype from "./StrainsWithPhenotype"

const Routes = () => {
  return (
    <Switch>
      <Route path="/strains/:id" component={StrainDetails} />
      <Route path="/phenotypes/:name" component={StrainsWithPhenotype} />
    </Switch>
  )
}

export default Routes
