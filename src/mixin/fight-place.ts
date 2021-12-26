import { ZilPayBase } from "mixin/zilpay-base";
import { Contracts } from "config/contracts";
import { pushToList } from "@/store/transactions";
import { ZIlPayToken } from "./zilpay-token";

export class FigthPlace {
  public zilpay = new ZilPayBase();

  public async startPublicFight(defended: string, attacker: string) {
    const params = [
      {
        vname: `defender_id`,
        type: `Uint256`,
        value: String(defended),
      },
      {
        vname: `attacker_id`,
        type: `Uint256`,
        value: String(attacker),
      },
    ];
    const transition = `StartPublicFight`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.FightPlace,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Fighting #${attacker} with #${defended}`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async addToPublicList(tokenId: string, price: number) {
    const zilpay = await this.zilpay.zilpay();
    const { BN } = zilpay.utils;
    const priceBN = new BN(String(price));
    const decimal = new BN(ZIlPayToken.decimal);
    const value = priceBN.mul(decimal).toString();
    const params = [
      {
        vname: `id`,
        type: `Uint256`,
        value: tokenId,
      },
      {
        vname: `price`,
        type: `Uint128`,
        value,
      },
    ];
    const transition = `AddToPublicList`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.FightPlace,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Place a dragon #${tokenId} to public fight.`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async cancelFromPublic(tokenId: string) {
    const params = [
      {
        vname: `id`,
        type: `Uint256`,
        value: tokenId,
      },
    ];
    const transition = `RmFromPublicList`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.FightPlace,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Cancel a dragon #${tokenId} from public fight.`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async healWound(tokenId: string, wound: number) {
    const params = [
      {
        vname: `id`,
        type: `Uint256`,
        value: tokenId,
      },
      {
        vname: `wound_id`,
        type: `Uint32`,
        value: String(wound),
      },
    ];
    const transition = `ToHeal`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.FightPlace,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Heal a wound for Dragon #${tokenId}.`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }
}
