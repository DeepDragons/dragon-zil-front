import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { pushToList } from '@/store/transactions';

export class MarketPlace {
  public static zilDecimal = '1000000000000';

  public zilpay = new ZilPayBase();

  public async cancel(orderId: string) {
    const params = [
      {
        vname: 'cancel_order_id',
        type: 'Uint256',
        value: orderId
      }
    ];
    const transition = 'CancelListing';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.MarketPlace
    });

    return String(res.ID);
  }

  public async sell(tokenId: string, price: number) {
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const priceBN = new BN(String(price));
    const decimal = new BN(MarketPlace.zilDecimal);
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

    pushToList({
      timestamp: new Date().getTime(),
      name: `Sell a dragon #${tokenId} on market-palce for ${price}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async purchase(tokenId: string, amount: string) {
    const params = [
      {
        vname: 'purchase_order_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'Purchase';
    const res = await this.zilpay.call({
      transition,
      params,
      amount,
      contractAddress: Contracts.MarketPlace
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Purchase a dragon #${tokenId} for ${Number(amount) / 10**12}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}