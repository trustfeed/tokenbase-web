export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';
export const removeAccessToken = () => ({
  type: REMOVE_ACCESS_TOKEN
});

export const SET_PLATFORM = 'SET_PLATFORM';
export const setPlatform = (platform) => ({
  type: SET_PLATFORM,
  payload: { platform }
});

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const signIn = (body) => ({
  type: SIGN_IN,
  payload: body
});

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export const signUp = (body) => ({
  type: SIGN_UP,
  payload: body
});

export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const VERIFY_EMAIL_SUCCEEDED = 'VERIFY_EMAIL_SUCCEEDED';
export const VERIFY_EMAIL_FAILED = 'VERIFY_EMAIL_FAILED';
export const verifyEmail = (body) => ({
  type: VERIFY_EMAIL,
  payload: body
});
