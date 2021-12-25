import { ZilPayBase } from "mixin/zilpay-base";
import { Contracts } from "config/contracts";
import { pushToList } from "@/store/transactions";

export class NameDragons {
  public zilpay = new ZilPayBase();

  public async setName(name: string, tokenId: string) {
    const params = [
      {
        vname: `name`,
        type: `String`,
        value: name,
      },
      {
        vname: `token_id`,
        type: `Uint256`,
        value: tokenId,
      },
    ];
    const transition = `SetName`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.Name,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Change name for #${tokenId} to (${name})`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async getName(tokenId: string) {
    const field = `dragons_name`;
    const result = await this.zilpay.getSubState(Contracts.Name, field, [
      tokenId,
    ]);

    return result;
  }

  public async getPrice() {
    const field = `price_curve`;
    const result = await this.zilpay.getSubState(Contracts.Name, field);

    if (!result) {
      return BigInt(0);
    }

    return BigInt(result);
  }
}
