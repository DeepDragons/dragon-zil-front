import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { ZIlPayToken } from './zilpay-token';

export class FigthPlace {
  public zilpay = new ZilPayBase();

  public async place(tokenId: string, price: number) {
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const priceBN = new BN(String(price));
    const decimal = new BN(ZIlPayToken.decimal);
    const value = priceBN.mul(decimal);
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

    return String(res.ID);
  }
}