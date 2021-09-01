import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { pushToList } from '@/store/transactions';
import { getKeyByValue } from '@/lib/key-by-value';
import { trim } from 'lib/trim';

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

    pushToList({
      timestamp: new Date().getTime(),
      name: `Transfer a dragon #${tokenId} to ${trim(to)}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
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

    pushToList({
      timestamp: new Date().getTime(),
      name: `Approve a dragon #${tokenId} for ${getKeyByValue(Contracts, to)}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async getTokenApprovals(tokenId: string, contract: Contracts) {
    const field = 'token_approvals';
    const result = await this.zilpay.getSubState(
      Contracts.Main,
      field,
      [tokenId]
    );

    return result === contract;
  }

  public async hatchEgg(tokenId: string) {
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'UpStage';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Main
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Hatch an egg #${tokenId}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async burn(tokenId: string) {
    const params = [
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId
      }
    ];
    const transition = 'Burn';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.Main
    });

    pushToList({
      timestamp: new Date().getTime(),
      name: `Kill a dragon #${tokenId}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}
