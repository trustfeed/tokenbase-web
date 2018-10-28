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

export const getCreateEthTokenAPI = () => `${HOST}/eth/tokens`;
export const getFinaliseEthTokenAPI = () => `${HOST}/eth/tokens/finalise`;

export const getCreateEthCrowdsalesAPI = () => `${HOST}/eth/crowdsales`;
export const getFinaliseEthCrowdsalesAPI = () => `${HOST}/eth/crowdsales/finalise`;

export const getUserAPI = (id?: string) => `${HOST}/users${id ? `/${id}` : ''}`;
export const getAuthAPI = () => `${HOST}/auth`;
export const getEmailVerificationAPI = () => `${HOST}/user/verify-email`;

export const handleFetch = async ({ fetch, method, url, accessToken, data }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  return await fetch({
    method,
    url,
    headers: handleHeaders(headers, accessToken),
    data: JSON.stringify(data)
  });
};

const handleHeaders = (headers, accessToken?: string) => {
  if (accessToken) {
    return {
      ...headers,
      'X-Access-Token': accessToken
    };
  }
  return headers;
};

export const handleError = (error): void => {
  const { request } = error;
  if (request.status === 401 || request.status === 403) {
    console.log('remove access token');
  }

  throw new Error(error);
};
