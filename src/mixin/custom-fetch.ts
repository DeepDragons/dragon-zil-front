import { Contracts } from "@/config/contracts";
import { ZilPayBase } from './zilpay-base';

export enum RPCMethods {
  GetSmartContractSubState = 'GetSmartContractSubState',
  GetTransaction = 'GetTransaction'
}

export class Blockchain extends ZilPayBase {
  private _http = `https://api.zilliqa.com/`;

  public async getTransaction(...hash: string[]) {
    const batch = hash.map((hash) => ({
      method: RPCMethods.GetTransaction,
      params: [hash],
      id: 1,
      jsonrpc: `2.0`,
    }));
    return this._send(batch);
  }

  public async fetchForHeal() {
    const allowances = 'allowances';
    const price = 'heal_wound_price';
    const zilpay = await this.zilpay();
    const owner = String(zilpay.wallet.defaultAccount?.base16).toLowerCase();
    let allowancesValue = '0';

    const batch = [
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          zilpay.crypto.toHex(Contracts.ZIlPay),
          allowances,
          [owner, Contracts.FightPlace]
        ],
        id: 1,
        jsonrpc: `2.0`,
      },
      {
        method: RPCMethods.GetSmartContractSubState,
        params: [
          zilpay.crypto.toHex(Contracts.FightPlace),
          price,
          []
        ],
        id: 1,
        jsonrpc: `2.0`,
      }
    ];
    const res = await this._send(batch);

    try {
      allowancesValue = res[0]['result'][allowances][owner][Contracts.FightPlace]
    } catch {
      allowancesValue = '0';
    }

    return {
      allowances: allowancesValue,
      price: res[1]['result'][price]
    };
  }

  private async _send(batch: object[]) {
    const res = await fetch(this._http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}
