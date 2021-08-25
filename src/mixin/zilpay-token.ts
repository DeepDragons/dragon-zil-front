import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';

export class ZIlPayToken {
  public zilpay = new ZilPayBase();
  public decimal = '1000000000000000000';

  public async getBalance() {
    const field = 'balances';
    const zilpay = await this.zilpay.zilpay;
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

  public async calcAllowances(value: number, allowances: string) {
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const decimalBN = new BN(this.decimal);
    const valueBN = new BN(String(value));
    const zlpBN = decimalBN.mul(valueBN);
    const allowancesBN = new BN(allowances); 

    return allowancesBN.lt(zlpBN);
  }

  public async getAllowances(contract: Contracts) {
    const field = 'token_approvals';
    const zilpay = await this.zilpay.zilpay;
    const owner = String(zilpay.wallet.defaultAccount?.base16);
    const result = await this.zilpay.getSubState(
      Contracts.ZIlPay,
      field,
      [owner, contract.toLowerCase()]
    );

    console.log(result);

    if (result) {
      return result;
    }

    return '0';
  }

  public async increaseAllowance(contract: Contracts) {
    const balance = '0';
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
      contractAddress: Contracts.Main
    });

    return String(res.ID);
  }
}