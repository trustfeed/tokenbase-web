export interface IEthToken {
  id: string;
  network: string;
  name: string;
  symbol: string;
  decimals: number;
  mintable: boolean;
  minters: string[];
  status: string;
}
