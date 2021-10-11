import { createDomain } from 'effector';
import { Contracts } from 'config/contracts';

let crowdSaleState = {
  maxReferralPercent: "50",
  startReferralPercent: "10",
  zilIncrementer: "10000000000000",
  zilPrice: "1502000000000000",
  zlpIncrementer: "5000000000000000000",
  zlpPrice: "355940000000000000000"
};
if (process.browser) {
  const catche = window.localStorage.getItem(Contracts.Distributer);

  if (catche) {
    crowdSaleState = JSON.parse(catche);
  }
}

const crowdSaleDomain = createDomain();
export const updateState = crowdSaleDomain.createEvent<typeof crowdSaleState>();
export const $crowdSaleStore = crowdSaleDomain
  .createStore(crowdSaleState)
  .on(updateState, (_, payload) => {
    window.localStorage.setItem(Contracts.Distributer, JSON.stringify(payload));
    
    return payload;
  });
