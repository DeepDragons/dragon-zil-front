import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';

export class DragonZIL {
  public zilpay = new ZilPayBase();

  public async transfer(to: string, tokenId: string) {
    const zilpay = await this.zilpay.zilpay;
    if (!zilpay.utils.validation.isBech32(to)) {
      throw new Error('Address should be bech32 format');
    }
    const address = zilpay.crypto.toChecksumAddress(to);
    const params = [
      {
        vname: 'to',
        type: 'ByStr20',
        value: address
      },
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'Transfer';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Main
    });

    return String(res.ID);
  }

  public async setApprove(tokenId: string, to: Contracts) {
    const params = [
      {
        vname: 'to',
        type: 'ByStr20',
        value: to
      },
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'SetApprove';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Main
    });

    return String(res.ID);
  }

  public async getTokenApprovals(tokenId: string, contract: Contracts) {
      const field = 'token_approvals'
      const result = await this.zilpay.getSubState(
        Contracts.Main,
        field,
        [tokenId]
      );

      return result === contract;
  }
}
