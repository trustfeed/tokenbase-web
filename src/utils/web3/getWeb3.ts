// tslint:disable-next-line: no-var-requires
const Web3 = require('web3');

export const getWeb3 = async (
  resolve: (web3: any) => void,
  reject: (reason: any) => void
): Promise<void> => {
  try {
    const web3 = (window as any).web3;
    const isInjected: boolean = typeof web3 !== 'undefined'; // i.e. Mist/Metamask

    let myWeb3;

    if (isInjected) {
      myWeb3 = new Web3(web3.currentProvider);
    } else {
      throw new Error('NOT_INSTALLED');
    }
    const coinbase = await myWeb3.eth.getCoinbase();
    if (!coinbase) {
      throw new Error('NOT_ACTIVATED');
    }
    resolve(myWeb3);
  } catch (error) {
    console.log(error);
    reject(error);
  }
};
