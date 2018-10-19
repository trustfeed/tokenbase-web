import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import LoginContainer from './containers/login-container';
import HomeCotainer from './containers/home-container';
import EmailVerificationCardContainer from './containers/email-verification-container';

export const appHistory = createHistory();

export const paths = {
  home: '/home',
  login: '/login',
  signup: '/signup',
  emailVerification: '/email-verification'
};

export const routeList = [
  {
    path: paths.home,
    component: HomeCotainer
  },
  {
    path: paths.login,
    component: LoginContainer
  },
  {
    path: paths.signup,
    component: LoginContainer
  },
  {
    path: paths.emailVerification,
    component: EmailVerificationCardContainer
  }
];

export const RouterNode: React.SFC = () => (
  <Router history={appHistory}>
    <div>
      <Switch>
        {routeList.map((prop, key) => (
          <Route exact={true} path={prop.path} key={key} component={prop.component} />
        ))}
        <Redirect from="/" to={paths.home} />
      </Switch>
    </div>
  </Router>
);
