import React from "react"
import { Switch, Route } from "react-router-dom"
import StrainDetails from "./StrainDetails"
import StrainsWithPhenotype from "./StrainsWithPhenotype"

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/strain-details"
        render={(props) => <StrainDetails {...props} id="DBS0351367" />}
      />
      <Route
        path="/strain-details-2"
        render={(props) => <StrainDetails {...props} id="DBS0349879" />}
      />
      <Route
        path="/strains-with-phenotype"
        render={(props) => (
          <StrainsWithPhenotype {...props} phenotype="aberrant aggregation" />
        )}
      />
      <Route
        path="/strains-with-phenotype-2"
        render={(props) => (
          <StrainsWithPhenotype {...props} phenotype="decreased growth rate" />
        )}
      />
      <Route
        path="/strains-with-phenotype-3"
        render={(props) => (
          <StrainsWithPhenotype
            {...props}
            phenotype="abolished protein phosphorylation"
          />
        )}
      />
    </Switch>
  )
}

export default Routes
