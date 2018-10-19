import * as consts from '../user/types';

export const signIn = () => ({
  type: consts.SIGN_IN
});

export const signUp = body => ({
  type: consts.SIGN_UP,
  payload: body
});

export const verifyEmail = body => ({
  type: consts.VERIFY_EMAIL,
  payload: body
});

export const removeAccessToken = () => ({
  type: consts.REMOVE_ACCESS_TOKEN
});

export const getUser = () => ({
  type: consts.GET_USER
});

export const updateUser = body => ({
  type: consts.UPDATE_USER,
  payload: { body }
});
