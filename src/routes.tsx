import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import LoginContainer from './containers/login-container';
import HomeCotainer from './containers/home-container';
import EmailVerificationCardContainer from './containers/email-verification-container';
import CreateTokenContainer from './containers/create-token-container';
import CreateCrowdsaleContainer from './containers/create-crowdsale-container';

export const appHistory = createHistory();

export const paths = {
  home: '/home',
  login: '/login',
  signup: '/signup',
  emailVerification: '/email-verification',
  createToken: '/create/token',
  createCrowdsale: '/create/crowdsale'
};

export const routeList = [
  {
    path: paths.home,
    component: HomeCotainer,
    label: 'home'
  },
  {
    path: paths.createToken,
    component: CreateTokenContainer,
    label: 'token'
  },
  {
    path: paths.createCrowdsale,
    component: CreateCrowdsaleContainer,
    label: 'crowdsale'
  },
  {
    path: paths.login,
    component: LoginContainer,
    label: undefined
  },
  {
    path: paths.signup,
    component: LoginContainer,
    label: undefined
  },
  {
    path: paths.emailVerification,
    component: EmailVerificationCardContainer,
    label: undefined
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
