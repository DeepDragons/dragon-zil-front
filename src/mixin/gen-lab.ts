import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { ZIlPayToken } from './zilpay-token';

export class GenLab {
  public zilpay = new ZilPayBase();

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

    return String(res.ID);
  }
}
