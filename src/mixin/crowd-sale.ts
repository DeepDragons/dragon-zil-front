import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { $crowdSaleStore, updateState } from 'store/crowd-sale';
import { pushToList } from '@/store/transactions';

export class CrowdSale {
  public zilpay = new ZilPayBase();
  public store = $crowdSaleStore;

  public async update() {
    const result = await this.zilpay.getState(Contracts.Distributer);
    const data = {
      maxReferralPercent: result.max_referral_percent,
      startReferralPercent: result.start_referral_percent,
      zilIncrementer: result.zil_incrementer,
      zilPrice: result.zil_price,
      zlpIncrementer: result.zlp_incrementer,
      zlpPrice: result.zlp_price
    };

    updateState(data);

    return data;
  }

  public async getReferralPercent(address: string) {
    const field = 'referrals';
    const res = await this.zilpay.getSubState(
      Contracts.Distributer,
      field,
      [address.toLowerCase()]
    );

    if (!res) {
      return 10;
    }

    return Number(res);
  }

  public async buyForZIL(numberOf: number, ref = '0x0000000000000000000000000000000000000000'): Promise<string> {
    const BN = (await this.zilpay.zilpay()).utils.BN;
    const params = [
      {
        vname: 'refAddr',
        type: 'ByStr20',
        value: ref
      }
    ];
    const gas = {
      gasPrice: '2000',
      gaslimit: String(2000 * numberOf)
    };
    const state = this.store.getState();
    const transition = 'Buy';
    const amount = new BN(state.zilPrice);
    numberOf = new BN(numberOf);
    const value = amount.mul(numberOf).toString();

    const res = await this.zilpay.call({
      transition,
      params,
      amount: value,
      contractAddress: Contracts.Distributer,
    }, gas);

    pushToList({
      timestamp: new Date().getTime(),
      name: `Buy ${numberOf} egg for ${Number(value) / 10**12}`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }

  public async buyForZLP(numberOf: number): Promise<string> {
    const state = this.store.getState();
    const zilpay = await this.zilpay.zilpay();
    const BN = zilpay.utils.BN;
    const gas = {
      gasPrice: '2000',
      gaslimit: String(3000 * numberOf)
    };
    const amount = new BN(state.zlpPrice);
    numberOf = new BN(numberOf);
    const value = amount.mul(numberOf).toString();
    const params = [
      {
        vname: 'to',
        type: 'ByStr20',
        value: Contracts.Distributer
      },
      {
        vname: 'amount',
        type: 'Uint128',
        value: value
      }
    ];
    const transition = 'Transfer';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.ZIlPay
    }, gas);

    pushToList({
      timestamp: new Date().getTime(),
      name: `Buy ${numberOf} egg for ${Number(value) / 10**18} $ZLP`,
      confirmed: false,
      hash: res.ID,
      from: res.from
    });

    return String(res.ID);
  }
}
