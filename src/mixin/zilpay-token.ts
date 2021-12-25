import { ZilPayBase } from "mixin/zilpay-base";
import { Contracts } from "config/contracts";
import { $wallet } from "store/wallet";
import { pushToList } from "@/store/transactions";
import { getKeyByValue } from "@/lib/key-by-value";

export class ZIlPayToken {
  public static decimal = `1000000000000000000`;

  public zilpay = new ZilPayBase();

  public async getBalance(addr: string) {
    addr = String(addr).toLowerCase();
    const field = `balances`;
    const zilpay = await this.zilpay.zilpay();
    const result = await this.zilpay.getSubState(Contracts.ZIlPay, field, [
      addr,
    ]);
    if (result) {
      return result;
    }

    return `0`;
  }

  public isAllow(value: string, allowances: string) {
    const bigValue = BigInt(value);
    const bigAllow = BigInt(allowances);

    return bigValue < bigAllow;
  }

  public async getAllowances(contract: Contracts): Promise<string> {
    const field = `allowances`;
    const zilpay = await this.zilpay.zilpay();
    const owner = String(zilpay.wallet.defaultAccount?.base16).toLowerCase();
    const address = contract.toLowerCase();
    const result = await this.zilpay.getSubState(Contracts.ZIlPay, field, [
      owner,
      address,
    ]);

    if (result && result[owner] && result[owner][address]) {
      return result[owner][address];
    }

    return `0`;
  }

  public async increaseAllowance(contract: Contracts) {
    const wallet = $wallet.getState();
    const balance = await this.getBalance(String(wallet?.base16));
    const params = [
      {
        vname: `spender`,
        type: `ByStr20`,
        value: contract,
      },
      {
        vname: `amount`,
        type: `Uint128`,
        value: String(balance),
      },
    ];
    const transition = `IncreaseAllowance`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.ZIlPay,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `increaseAllowance for ${getKeyByValue(Contracts, contract)}`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }
}
