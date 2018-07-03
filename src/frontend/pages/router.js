import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './login';
import User from './user';
import Charts from './charts';

const Router = () => (
    <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/user" component={ User } />
        <Route path="/charts" component={ Charts } />
        <Redirect to="/login"/>
    </Switch>
)
  
export default Router;