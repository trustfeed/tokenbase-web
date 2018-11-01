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
