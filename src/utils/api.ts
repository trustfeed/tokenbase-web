const getHost = (host: string) => {
  switch (host) {
    case 'www.daobase.io':
    case 'daobase.io':
      return 'https://api.tokenadmin.work/v0';
    default:
      return 'https://api-staging.tokenadmin.work/v0';
  }
};

const HOST = getHost(window.location.hostname);

// When logged in you can get the current user data from here
export const getSignInAPI = () => `${HOST}/user/auth`;
export const getSignUpAPI = () => `${HOST}/user/signup`;

export const getEthTokensAPI = () => `${HOST}/eth/tokens`;
export const getEthTokenAPI = (id) => `${HOST}/eth/tokens/${id}`;
export const getFinaliseEthTokenAPI = () => `${HOST}/eth/tokens/finalise`;

export const getEthCrowdsalesAPI = () => `${HOST}/eth/crowdsales`;
export const getEthCrowdsaleAPI = (id) => `${HOST}/eth/crowdsales/${id}`;
export const getFinaliseEthCrowdsaleAPI = () => `${HOST}/eth/crowdsales/finalise`;

export const getTwoFactorAuthAPI = () => `${HOST}/two-factor`;
export const getUserAPI = () => `${HOST}/user`;
export const getAuthAPI = () => `${HOST}/auth`;
export const getEmailVerificationAPI = () => `${HOST}/user/verify-email`;
export const getPasswordResetAPI = () => `${HOST}/user/password-reset`;
export const getRequestPasswordResetAPI = () => `${HOST}/user/request-password-reset`;

export const handleFetch = async ({ fetch, method, url, accessToken, data }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const result = await fetch({
    method,
    url,
    headers: handleHeaders(headers, accessToken),
    data: JSON.stringify(data)
  });
  return result.data;
};

const handleHeaders = (headers, accessToken?: string) => {
  if (accessToken !== undefined) {
    return {
      ...headers,
      'X-Access-Token': accessToken
    };
  }
  return headers;
};

export const getErrorStatus = (error): number => {
  const { request } = error;
  const { status } = request;
  return status;
};
