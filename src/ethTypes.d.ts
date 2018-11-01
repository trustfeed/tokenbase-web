export interface IEthCrowdsale {
  goal: string;
  cap: string;
  duration: number;
  id: string;
  minted: boolean;
  name: string;
  network: string;
  openingTime: number;
  rate: string;
  status: string;
  wallet: string;
  token: string;
}

export interface IEthToken {
  id: string;
  network: string;
  name: string;
  symbol: string;
  decimals: number;
  mintable: boolean;
  minters: string[];
  status: string;
  payment?: IEthTokenPayment;
  publicAddress?: string;
}

export interface IEthTokenPayment {
  amount: string;
  expireAt: number;
  id: string;
  network: string;
  publicAddress: string;
  received: string;
  status: string;
}
