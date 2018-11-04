import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import AuthContainer from './containers/auth-container';
import HomeCotainer from './containers/home-container';
import EmailVerificationCardContainer from './containers/email-verification-container';
import CreateEthTokenContainer from './containers/token-form-container';
import CreateEthCrowdsaleContainer from './containers/crowdsale-form-container';
import EthTokens from './containers/token-list-container';
import EthToken from './containers/token-card-container';
import EthCrowdsales from './containers/crowdsale-list-container';
import EthCrowdsale from './containers/crowdsale-card-container';

export const appHistory = createHistory();

export const paths = {
  home: '/home',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forget-password',
  emailVerification: '/email-verification',

  ethTokens: 'base/eth/tokens',
  ethToken: 'base/eth/token',
  ethCrowdsales: 'base/eth/crowdsales',
  ethCrowdsale: 'base/eth/crowdsale',
  createEthToken: 'base/eth/token/contract',
  createEthCrowdsale: 'base/eth/crowdsale/contract/'
};

export const routeList = [
  {
    path: paths.home,
    component: HomeCotainer,
    label: 'home'
  },
  {
    path: paths.ethCrowdsales,
    component: EthCrowdsales,
    label: 'Crowdsale List'
  },
  {
    path: paths.ethCrowdsale,
    component: EthCrowdsale,
    label: 'Crowdsale Card'
  },
  {
    path: paths.ethTokens,
    component: EthTokens,
    label: 'token List'
  },
  {
    path: paths.ethToken,
    component: EthToken,
    label: 'token card'
  },
  {
    path: paths.createEthToken,
    component: CreateEthTokenContainer,
    label: 'create token'
  },
  {
    path: paths.createEthCrowdsale,
    component: CreateEthCrowdsaleContainer,
    label: 'create crowdsale'
  },
  {
    path: paths.login,
    component: AuthContainer,
    label: 'login'
  },
  {
    path: paths.signup,
    component: AuthContainer,
    label: 'signup'
  },
  {
    path: paths.forgotPassword,
    component: AuthContainer,
    label: 'forgotPassword'
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
