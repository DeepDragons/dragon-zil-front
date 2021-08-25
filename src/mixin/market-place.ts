import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';

export class MarketPlace {
  public zilpay = new ZilPayBase();

  public async sell(tokenId: string, price: number) {
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const priceBN = new BN(String(price));
    const decimal = new BN('1000000000000');
    const value = priceBN.mul(decimal);
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      },
      {
        vname: 'price',
        type: 'Uint128',
        value: String(value)
      }
    ];
    const transition = 'Sell';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.MarketPlace
    });

    return String(res.ID);
  }
}