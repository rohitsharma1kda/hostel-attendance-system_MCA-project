import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Btech from "./branch/Btech";
import Mtech from "./branch/Mtech";
import MCA from "./branch/MCA";
import { ColorButtonCyan } from "../approval/ApprovalStyle";

const Boarders = () => {
  return (
    <div>
      <br />
      
        <ColorButtonCyan variant="contained" size="large" href="/boarders/btech">Btech</ColorButtonCyan>
        <ColorButtonCyan variant="contained" size="large" href="/boarders/mtech">Mtech</ColorButtonCyan>
        <ColorButtonCyan variant="contained" size="large" href="/boarders/mca">MCA</ColorButtonCyan>
      
      <br />
      <BrowserRouter>
        <Switch>
          <Route exact path="/boarders/btech" component={Btech} />
          <Route exact path="/boarders/mtech" component={Mtech} />
          <Route exact path="/boarders/mca" component={MCA} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Boarders;
