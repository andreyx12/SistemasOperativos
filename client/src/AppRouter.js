import React from 'react';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Homex from './components/Homex/Homex';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ExampleComponent from './components/Redux/ExampleComponent';
import { hasRole, isAllowed } from './components/Authentication/Auth';


const user = {
  roles: ['user'],
  rights: ['can_view_articles']
};

const admin = {
  roles: ['user', 'admin'],
  rights: ['can_view_articles', 'can_view_users']
};

const AppRouter = ()=>(
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Login} exact={true} /> */}
        <Route path="/" component={Main} exact={true} />
        <Route path="/login/:session" component={Login} />
        <Route path='/home' component={Homex} />}
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
);

export default AppRouter;