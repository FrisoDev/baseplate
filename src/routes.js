import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Batches,
  SignIn,
  Batch,
  StudentEval,
  EditStudent
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
       <Route exact path="/"  component={Batches} />
       <Route path="/batches/:batchId" component={Batch} />
       <Route path="/students/:studentId" component={StudentEval} />
       <Route path="/students/:studentId/edit" component={EditStudent} />
       <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
