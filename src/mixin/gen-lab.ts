import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { ZIlPayToken } from './zilpay-token';
import { pushToList } from 'store/transactions';

export class GenLab {
  public zilpay = new ZilPayBase();

  public async getPrice(tokenId: string) {
    const {
      priceMultiplicator,
      startPrice,
      useCount,
      decimal
    } = await this.getCounter(tokenId);
    const multiplicator = priceMultiplicator.pow(useCount);
    const price = startPrice.mul(multiplicator);

    return [price.div(decimal).toString(), price.toString()];
  }

  public async getCounter(tokenId: string) {
    const field0 = 'price_multiplicator';
    const field1 = 'start_price';
    const field2 = 'use_count';
    const zilpay = await this.zilpay.zilpay();
    const BN = zilpay.utils.BN;
    let [priceMultiplicator, startPrice, useCount] = await Promise.all([
      this.zilpay.getSubState(Contracts.GenLab, field0),
      this.zilpay.getSubState(Contracts.GenLab, field1),
      this.zilpay.getSubState(Contracts.GenLab, field2, [tokenId])
    ]);

    if (!useCount) {
      useCount = '0';
    }

    return {
      priceMultiplicator: new BN(priceMultiplicator),
      startPrice: new BN(startPrice),
      useCount: new BN(useCount),
      decimal: new BN(ZIlPayToken.decimal)
    };
  }

  public async changeGen(tokenId: string, genNumber: number, value = 99) {
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      },
      {
        vname: 'gen_num',
        type: 'Uint256',
        value: String(genNumber)
      },
      {
        vname: 'new_value',
        type: 'Uint256',
        value: String(value)
      }
    ];
    const transition = 'ChangeGen';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.GenLab
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Upgrade gen ${genNumber + 1} for Dragon #${tokenId}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}
