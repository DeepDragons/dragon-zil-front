import { ZilPayBase } from "mixin/zilpay-base";
import { Contracts } from "config/contracts";
import { pushToList } from "@/store/transactions";

export class BreedPlace {
  public zilpay = new ZilPayBase();

  public async add(tokenId: string, price: number) {
    const params = [
      {
        vname: `token_id`,
        type: `Uint256`,
        value: String(tokenId),
      },
    ];
    const transition = `Add`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.Breed,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Add a dragon #${tokenId} to breed for ${price} $ZLP`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async cancelBreed(tokenId: string) {
    const params = [
      {
        vname: `token_id`,
        type: `Uint256`,
        value: tokenId,
      },
    ];
    const transition = `Cancel`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.Breed,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Get Back a dragon #${tokenId} from breed.`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async startBreeding(id0: string, id1: string) {
    const params = [
      {
        vname: `who_id`,
        type: `Uint256`,
        value: String(id1),
      },
      {
        vname: `with_id`,
        type: `Uint256`,
        value: String(id0),
      },
    ];
    const transition = `BreedStart`;
    const res = await this.zilpay.call({
      transition,
      params,
      amount: `0`,
      contractAddress: Contracts.Breed,
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Start breeding #${id0} with #${id1}`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }

  public async getCurve() {
    const field = `price_curve`;
    const res = await this.zilpay.getSubState(Contracts.Breed, field);

    if (!res) {
      return BigInt(0);
    }

    return BigInt(res);
  }
}
