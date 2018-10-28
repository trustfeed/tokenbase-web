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

export const getErrorStatus = (error): number => {
  const { request } = error;
  const { status } = request;
  return status;
};
