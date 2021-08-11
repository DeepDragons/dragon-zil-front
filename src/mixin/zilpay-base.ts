type Params = {
  contractAddress: string;
  transition: string;
  params: object[];
  amount: string;
};

const window = global.window as any;
const DEFAUL_GAS = {
  gasPrice: '2000',
  gaslimit: '5000'
};
export class ZilPayBase {
  public zilpay: Promise<any>;

  constructor() {
    this.zilpay = new Promise((resolve, reject) => {
      let k = 0;
      const i = setInterval(() => {
        if (k >= 10) {
          clearInterval(i);
          return reject('ZilPay inot installed');
        }

        if (typeof window['zilPay'] !== 'undefined') {
          clearInterval(i);
          return resolve(window['zilPay']);
        }

        k++;
      }, 100);
    });
  }

  async getSubState(contract: string, field: string, params: string[] = []) {
    const zilPay = await this.zilpay;
    const res = await zilPay
      .blockchain
      .getSmartContractSubState(
        contract,
        field,
        params
      );

    if (res.error) {
      throw new Error(res.error);
    }

    if (res.result && res.result[field] && params.length === 0) {
      return res.result[field];
    }

    if (res.result && res.result[field] && params.length === 1) {
      const [arg] = params;
      return res.result[field][arg];
    }

    if (res.result && res.result[field] && params.length > 1) {
      return res.result[field];
    }

    return null;
  }

  async getBlockchainInfo() {
    const zilPay = await this.zilpay;
    const { error, result } = await zilPay
      .blockchain
      .getBlockChainInfo();

    if (error) {
      throw new Error(error);
    }

    return result;
  }

  async call(data: Params, gas = DEFAUL_GAS) {
    const zilPay = await this.zilpay;
    const { contracts, utils } = zilPay;
    const contract = contracts.at(data.contractAddress);
    const gasPrice = utils.units.toQa(gas.gasPrice, utils.units.Units.Li);
    const gasLimit = utils.Long.fromNumber(gas.gaslimit);
    const amount = data.amount || '0';

    return await contract.call(
      data.transition,
      data.params,
      {
        amount,
        gasPrice,
        gasLimit
      }
    );
  }
}