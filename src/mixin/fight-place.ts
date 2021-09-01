import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { ZIlPayToken } from './zilpay-token';
import { pushToList } from '@/store/transactions';

export class FigthPlace {
  public zilpay = new ZilPayBase();

  public async startFight(id1: string, id0: string) {
    const params = [
      {
        vname: 'who_id',
        type: 'Uint256',
        value: String(id1)
      },
      {
        vname: 'with_id',
        type: 'Uint256',
        value: String(id0)
      }
    ];
    const transition = 'FightStart';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.FightPlace
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Fighting #${id1} with #${id0}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async place(tokenId: string, price: number, remove: boolean) {
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const priceBN = new BN(String(price));
    const decimal = new BN(ZIlPayToken.decimal);
    const value = priceBN.mul(decimal).toString();
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      },
      {
        vname: 'fight_price',
        type: 'Uint128',
        value: value
      }
    ];
    const transition = 'WaitListAddDel';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.FightPlace
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `${remove ? 'Get back' : 'Place'} a dragon #${tokenId} from fight.`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}