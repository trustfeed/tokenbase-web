let HOST: string;
switch (window.location.hostname) {
  case 'www.daobase.io':
  case 'daobase.io':
    HOST = 'https://api.tokenadmin.work/v0';
    break;

  case 'test.daobase.io':
    HOST = 'https://api-staging.tokenadmin.work/v0';
    break;

  default:
    // HOST = 'http://localhost:8080';
    HOST = 'https://api-staging.tokenadmin.work/v0';
    break;
}

// When logged in you can get the current user data from here
export const getSignInAPI = () => `${HOST}/user/auth`;
export const getSignUpAPI = () => `${HOST}/user/signup`;

export const getUserAPI = (id?: string) => `${HOST}/users${id ? `/${id}` : ''}`;
export const getAuthAPI = () => `${HOST}/auth`;
export const getEmailVerificationAPI = () => `${HOST}/user/verify-email`;

export const getHeaders = (accessToken?: string) => {
  if (accessToken) {
    return {
      'x-access-token': accessToken,
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};
