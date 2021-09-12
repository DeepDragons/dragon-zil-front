import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { ZIlPayToken } from './zilpay-token';
import { pushToList } from '@/store/transactions';

export class BreedPlace {
  public zilpay = new ZilPayBase();

  public async add(tokenId: string, price: number) {
    const zilpay = await this.zilpay.zilpay();
    const BN = zilpay.utils.BN;
    const priceBN = new BN(String(price));
    const decimal = new BN(ZIlPayToken.decimal);
    const value = priceBN.mul(decimal);
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: String(tokenId)
      },
      {
        vname: 'breed_price',
        type: 'Uint128',
        value: String(value)
      }
    ];
    const transition = 'Add';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Breed
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Add a dragon #${tokenId} to breed for ${price} $ZLP`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async cancelBreed(tokenId: string) {
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'Cancel';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Breed
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Get Back a dragon #${tokenId} from breed.`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async startBreeding(id0: string, id1: string) {
    const params = [
      {
        vname: 'who_id',
        type: 'Uint256',
        value: String(id0)
      },
      {
        vname: 'with_id',
        type: 'Uint256',
        value: String(id1)
      }
    ];
    const transition = 'BreedStart';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Breed
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Start breeding #${id0} with #${id1}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}
