import * as consts from '../user/actions';

const initialState = { platform: 'ethereum' };

export default function user(state = initialState, action) {
  switch (action.type) {
    case consts.REMOVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: undefined,
        isSignUpSuccessful: undefined,
        isEmailVerified: undefined,
        errorMessage: undefined
      };
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
    case consts.REQUEST_PASSWORD_RESET:
      return {
        ...state,
        isRequestingPasswordReset: true,
        isRequestPasswordResetSuccessful: undefined
      };
    case consts.REQUEST_PASSWORD_RESET_SUCCEEDED:
      return {
        ...state,
        isRequestingPasswordReset: false,
        isRequestPasswordResetSuccessful: true
      };
    case consts.REQUEST_PASSWORD_RESET_FAILED:
      return {
        ...state,
        isRequestingPasswordReset: false,
        isRequestPasswordResetSuccessful: false
      };
    case consts.RESET_PASSWORD:
      return {
        ...state,
        isResetting: true,
        isResetSuccessful: undefined
      };
    case consts.RESET_PASSWORD_SUCCEEDED:
      return {
        ...state,
        isResetting: false,
        isResetSuccessful: true
      };
    case consts.RESET_PASSWORD_FAILED:
      return {
        ...state,
        isResetting: false,
        isResetSuccessful: false
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

    case consts.SET_PLATFORM:
      return {
        ...state,
        platform: action.payload.platform
      };

    default:
      return state;
  }
}
