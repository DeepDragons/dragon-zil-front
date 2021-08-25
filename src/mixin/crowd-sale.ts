import { ZilPayBase } from 'mixin/zilpay-base';
import { Contracts } from 'config/contracts';
import { $crowdSaleStore, updateState } from 'store/crowd-sale';

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

  public async buyForZIL(numberOf: number, ref = '0x0000000000000000000000000000000000000000'): Promise<string> {
    const BN = (await this.zilpay.zilpay).utils.BN;
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

    const res = await this.zilpay.call({
      transition,
      params,
      amount: amount.mul(numberOf).toString(),
      contractAddress: Contracts.Distributer,
    }, gas);

    return String(res.ID);
  }

  public async buyForZLP(numberOf: number, ref = '0x0000000000000000000000000000000000000000'): Promise<string> {
    const state = this.store.getState();
    const zilpay = await this.zilpay.zilpay;
    const BN = zilpay.utils.BN;
    const gas = {
      gasPrice: '2000',
      gaslimit: String(3000 * numberOf)
    };
    const amount = new BN(state.zlpPrice);
    numberOf = new BN(numberOf);
    const params = [
      {
        vname: 'to',
        type: 'ByStr20',
        value: Contracts.Distributer
      },
      {
        vname: 'amount',
        type: 'Uint128',
        value: amount.mul(numberOf).toString()
      }
    ];
    const transition = 'Transfer';
    const res = await this.zilpay.call({
      transition,
      params,
      amount: '0',
      contractAddress: Contracts.ZIlPay
    }, gas);

    return String(res.ID);
  }
}
