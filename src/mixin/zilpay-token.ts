import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { pushToList } from '@/store/transactions';
import { getKeyByValue } from '@/lib/key-by-value';

export class ZIlPayToken {
  public static decimal = '1000000000000000000';
  public zilpay = new ZilPayBase();

  public async getBalance() {
    const field = 'balances';
    const zilpay = await this.zilpay.zilpay();
    const result = await this.zilpay.getSubState(
      Contracts.ZIlPay,
      field,
      [String(zilpay.wallet.defaultAccount?.base16).toLowerCase()]
    );
    if (result) {
      return result;
    }

    return '0';
  }

  public async calcAllowances(value: number, allowances: string): Promise<boolean> {
    const zilpay = await this.zilpay.zilpay();
    const BN = zilpay.utils.BN;
    const decimalBN = new BN(ZIlPayToken.decimal);
    const valueBN = new BN(String(value));
    const zlpBN = decimalBN.mul(valueBN);
    const allowancesBN = new BN(allowances);

    return allowancesBN.lt(zlpBN);
  }

  public async getAllowances(contract: Contracts): Promise<string> {
    const field = 'allowances';
    const zilpay = await this.zilpay.zilpay();
    const owner = String(zilpay.wallet.defaultAccount?.base16).toLowerCase();
    const address = contract.toLowerCase();
    const result = await this.zilpay.getSubState(
      Contracts.ZIlPay,
      field,
      [owner, address]
    );

    if (result && result[owner] && result[owner][address]) {
      return result[owner][address];
    }

    return '0';
  }

  public async increaseAllowance(contract: Contracts) {
    const balance = await this.getBalance();
    const params = [
      {
        vname: 'spender',
        type: 'ByStr20',
        value: contract
      },
      {
        vname: 'amount',
        type: 'Uint128',
        value: String(balance)
      }
    ];
    const transition = 'IncreaseAllowance';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.ZIlPay
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `increaseAllowance for ${getKeyByValue(Contracts, contract)}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}
