import React from "react"
import { Switch, Route } from "react-router-dom"
import StrainDetails from "./StrainDetails"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/strain-details" component={StrainDetails} />
    </Switch>
  )
}

export default Routes
