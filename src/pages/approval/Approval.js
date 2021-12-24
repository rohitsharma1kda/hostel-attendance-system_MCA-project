import React from 'react'
import ApprovalBtech from './branches/ApprovalBtech'
import ApprovalMtech from './branches/ApprovalMtech'
import ApprovalMCA from "./branches/ApprovalMCA"
import { ColorButtonCyan } from "../approval/ApprovalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function Approval() {
  return (
    <div>
      <br />
      
        <ColorButtonCyan variant="contained" size="large" href="/adfunc/btech">Btech</ColorButtonCyan>
        <ColorButtonCyan variant="contained" size="large" href="/adfunc/mtech">Mtech</ColorButtonCyan>
        <ColorButtonCyan  variant="contained" size="large" href="/adfunc/mca">MCA</ColorButtonCyan>
      
      <br />
      <BrowserRouter>
        <Switch>
          <Route exact path="/adfunc/btech" component={ApprovalBtech} />
          <Route exact path="/adfunc/mtech" component={ApprovalMtech} />
          <Route exact path="/adfunc/mca" component={ApprovalMCA} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Approval
