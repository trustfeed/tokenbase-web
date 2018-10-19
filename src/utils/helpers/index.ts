export const numberWithCommas = (x: string): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getRate = (pricePerEth: string): string => {
  const pricePerEthNum: number = parseFloat(pricePerEth);
  if (pricePerEthNum > 1) {
    throw new Error('input should not be bigger than 1');
  } else if (pricePerEthNum <= 0) {
    throw new Error('input should not be smaller than 0');
  }
  // multiplicative inverse
  const pricePerEthInverted = 1 / pricePerEthNum;
  let rate = pricePerEthInverted;
  // parse integer
  rate = parseInt(rate.toString(), 10);
  // return string integer
  return rate.toString();
};

export const inverseNumber = (nubmerStr: string): string => {
  const numFloat: number = parseFloat(nubmerStr);
  if (numFloat <= 0) {
    throw new Error('input should not be smaller than 0');
  }
  // multiplicative inverse
  const numFloatInverted: number = 1 / numFloat;
  // return string
  return numFloatInverted.toString();
};

export const changeQueryStringToJSON = (qs: string): any => {
  if (!qs) {
    return {};
  }
  const pairs = qs.split('&');

  const result = {};
  pairs.forEach(item => {
    const pair = item.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
};

export const getNetworkName = (netId: number | undefined): string => {
  switch (netId) {
    case 1:
      return 'Mainnet';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 42:
      return 'Kovan';
    default:
      return `Network ${netId}`;
  }
};
export const validateNetwork = (netId: number | undefined) => netId === 4;
export const getAddressURLFromEtherScan = (id, netId) => {
  let link;
  switch (netId) {
    case 1: // main net
      link = `https://etherscan.io/address/${id}`;
      break;
    case 2: // morden test net
      link = `https://morden.etherscan.io/address/${id}`;
      break;
    case 3: // ropsten test net
      link = `https://ropsten.etherscan.io/address/${id}`;
      break;
    case 4: // rinkeby test net
      link = `https://rinkeby.etherscan.io/address/${id}`;
      break;
    case 42: // kovan test net
      link = `https://kovan.etherscan.io/address/${id}`;
      break;
    default:
      link = '';
      break;
  }
  return link;
};
