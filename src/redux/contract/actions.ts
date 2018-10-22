import * as consts from '../user/types';

export const createTokenContract = (body) => ({
  type: consts.SIGN_IN,
  payload: body
});
