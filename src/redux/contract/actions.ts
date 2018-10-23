import * as consts from '../user/types';

export const createTokenContract = (body) => ({
  type: consts.SIGN_IN,
  payload: body
});

export const createCrowdsaleContract = (body) => ({
  type: consts.SIGN_IN,
  payload: body
});
