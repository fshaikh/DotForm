import React from "react";
import { Route, Switch } from "react-router-dom";

import MyForms from '../MyForms/MyForms';
import Login from './Login';

const AppRoutes = () => {
    return (
      <Switch>
        <Route exact path="/callback" render={(props) => {
            return <Login {...props} />
        }} />
        <Route exact path="/myforms" component={MyForms} />
      </Switch>
    );
};

export default AppRoutes;
