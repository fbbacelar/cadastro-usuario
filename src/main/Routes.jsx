import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import UserCrud from '../components/usuario/UserCrud';

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/usuarios' component={UserCrud} / >
        <Redirect from='*' to='/' />
    </Switch>