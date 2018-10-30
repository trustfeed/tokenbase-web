import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import LoginContainer from './containers/login-container';
import HomeCotainer from './containers/home-container';
import EmailVerificationCardContainer from './containers/email-verification-container';
import CreateEthTokenContainer from './containers/create-token-container';
import CreateEthCrowdsaleContainer from './containers/create-crowdsale-container';
import EthTokens from './containers/token-list-container';
import EthToken from './containers/token-container';

export const appHistory = createHistory();

export const paths = {
  home: '/home',
  login: '/login',
  signup: '/signup',
  emailVerification: '/email-verification',
  ethTokens: '/eth/tokens',
  ethToken: '/eth/token',
  createEthToken: '/eth/token/create',
  createEthCrowdsale: '/eth/crowdsale/create/'
};

export const routeList = [
  {
    path: paths.home,
    component: HomeCotainer,
    label: 'home'
  },
  {
    path: paths.ethTokens,
    component: EthTokens,
    label: 'eth tokens'
  },
  {
    path: paths.ethToken,
    component: EthToken,
    label: 'eth token'
  },
  {
    path: paths.createEthToken,
    component: CreateEthTokenContainer,
    label: 'token'
  },
  {
    path: paths.createEthCrowdsale,
    component: CreateEthCrowdsaleContainer,
    label: 'crowdsale'
  },
  {
    path: paths.login,
    component: LoginContainer,
    label: 'login'
  },
  {
    path: paths.signup,
    component: LoginContainer,
    label: 'signup'
  },
  {
    path: paths.emailVerification,
    component: EmailVerificationCardContainer,
    label: 'email verification'
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
