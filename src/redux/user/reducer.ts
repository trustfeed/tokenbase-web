import * as consts from '../user/types';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case consts.SIGN_IN:
      return {
        ...state,
        isSigningIn: true,
        accessToken: undefined
      };

    case consts.SIGN_IN_SUCCEEDED:
      return {
        ...state,
        isSigningIn: false,
        accessToken: action.payload.accessToken
      };
    case consts.SIGN_IN_FAILED:
      return {
        ...state,
        isSigningIn: false,
        accessToken: undefined
      };
    case consts.SIGN_UP:
      return {
        ...state,
        isSigningUp: true,
        isSignUpSuccessful: undefined
      };

    case consts.SIGN_UP_SUCCEEDED:
      return {
        ...state,
        isSigningUp: false,
        isSignUpSuccessful: true
      };
    case consts.SIGN_UP_FAILED:
      return {
        ...state,
        isSigningUp: false,
        isSignUpSuccessful: false
      };

    case consts.VERIFY_EMAIL:
      return {
        ...state,
        isVerifyingEmail: true,
        isEmailVerified: false,
        errorMessage: undefined
      };
    case consts.VERIFY_EMAIL_SUCCEEDED:
      return {
        ...state,
        isVerifyingEmail: false,
        isEmailVerified: true,
        errorMessage: undefined
      };
    case consts.VERIFY_EMAIL_FAILED:
      return {
        ...state,
        isVerifyingEmail: false,
        isEmailVerified: false,
        errorMessage: action.payload.errorMessage
      };

    default:
      return state;
  }
}
