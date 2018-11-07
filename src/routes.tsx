import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import AuthContainer from './containers/auth-form-container';
import HomeCotainer from './containers/home-container';
import EmailVerificationContainer from './containers/email-verification-container';
import ResetPasswordContainer from './containers/reset-password-container';
import CreateEthTokenContainer from './containers/token-form-container';
import CreateEthCrowdsaleContainer from './containers/crowdsale-form-container';
import EthTokens from './containers/token-list-container';
import EthToken from './containers/token-card-container';
import EthCrowdsales from './containers/crowdsale-list-container';
import EthCrowdsale from './containers/crowdsale-card-container';

export const appHistory = createHistory();

export const paths = {
  home: '/home',
  signin: '/signin',
  signup: '/signup',
  forgotPassword: '/forget-password',
  emailVerification: '/email-verification',
  resetPassword: '/password-reset',

  ethTokens: '/base/eth/tokens',
  ethToken: '/base/eth/token',
  ethCrowdsales: '/base/eth/crowdsales',
  ethCrowdsale: '/base/eth/crowdsale',
  ethCreateToken: '/base/eth/token/contract',
  ethCreateCrowdsale: '/base/eth/crowdsale/contract/'
};

export const routeList = [
  {
    path: paths.home,
    component: HomeCotainer,
    label: 'Home'
  },
  {
    path: paths.ethCrowdsales,
    component: EthCrowdsales,
    label: 'Crowdsale List'
  },
  {
    path: paths.ethCrowdsale,
    component: EthCrowdsale,
    label: undefined
  },
  {
    path: paths.ethTokens,
    component: EthTokens,
    label: 'Token List'
  },
  {
    path: paths.ethToken,
    component: EthToken,
    label: undefined
  },
  {
    path: paths.ethCreateToken,
    component: CreateEthTokenContainer,
    label: undefined
  },
  {
    path: paths.ethCreateCrowdsale,
    component: CreateEthCrowdsaleContainer,
    label: undefined
  },
  {
    path: paths.signin,
    component: AuthContainer,
    label: 'Login'
  },
  {
    path: paths.signup,
    component: AuthContainer,
    label: undefined
  },
  {
    path: paths.forgotPassword,
    component: AuthContainer,
    label: undefined
  },
  {
    path: paths.emailVerification,
    component: EmailVerificationContainer,
    label: undefined
  },
  {
    path: paths.resetPassword,
    component: ResetPasswordContainer,
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
