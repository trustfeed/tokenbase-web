export const CREATE_ETH_CROWDSALE = 'CREATE_ETH_CROWDSALE';
export const CREATE_ETH_CROWDSALE_SUCCEEDED = 'CREATE_ETH_CROWDSALE_SUCCEEDED';
export const CREATE_ETH_CROWDSALE_FAILED = 'CREATE_ETH_CROWDSALE_FAILED';
export const createEthCrowdsale = (body) => ({
  type: CREATE_ETH_CROWDSALE,
  payload: { body }
});

export const UPDATE_ETH_CROWDSALE = 'UPDATE_ETH_CROWDSALE';
export const UPDATE_ETH_CROWDSALE_SUCCEEDED = 'UPDATE_ETH_CROWDSALE_SUCCEEDED';
export const UPDATE_ETH_CROWDSALE_FAILED = 'UPDATE_ETH_CROWDSALE_FAILED';
export const updateEthCrowdsale = (body, id) => ({
  type: UPDATE_ETH_CROWDSALE,
  payload: { body, id }
});

export const GET_ETH_CROWDSALES = 'GET_ETH_CROWDSALES';
export const GET_ETH_CROWDSALES_SUCCEEDED = 'GET_ETH_CROWDSALES_SUCCEEDED';
export const GET_ETH_CROWDSALES_FAILED = 'GET_ETH_CROWDSALES_FAILED';
export const getEthCrowdsales = () => ({
  type: GET_ETH_CROWDSALES
});

export const GET_ETH_CROWDSALE = 'GET_ETH_CROWDSALE';
export const GET_ETH_CROWDSALE_SUCCEEDED = 'GET_ETH_CROWDSALE_SUCCEEDED';
export const GET_ETH_CROWDSALE_FAILED = 'GET_ETH_CROWDSALE_FAILED';
export const getEthCrowdsale = (id) => ({
  type: GET_ETH_CROWDSALE,
  payload: { id }
});

export const CREAR_ETH_CROWDSALE = 'CREAR_ETH_CROWDSALE';
export const clearEthCrowdsale = () => ({
  type: CREAR_ETH_CROWDSALE
});

export const FINALISE_ETH_CROWDSALE = 'FINALISE_ETH_CROWDSALE';
export const FINALISE_ETH_CROWDSALE_SUCCEEDED = 'FINALISE_ETH_CROWDSALE_SUCCEEDED';
export const FINALISE_ETH_CROWDSALE_FAILED = 'FINALISE_ETH_CROWDSALE_FAILED';
export const finaliseEthCrowdsale = (id) => ({
  type: FINALISE_ETH_CROWDSALE,
  payload: { id }
});
