import { Contracts } from '@/config/contracts';
import { createDomain } from 'effector';

export interface Battle {
  hash: string;
  who: string;
  with: string;
  amount: string;
  winner?: string;
}

let lastTx: Battle | null = null;

if (process.browser) {
  const catche = window.localStorage.getItem(Contracts.FightPlace);

  try {
    if (catche) {
      lastTx = JSON.parse(catche);
    }
  } catch {
    ////
  }
}

const ArenaDomain = createDomain();
export const updateArena = ArenaDomain.createEvent<Battle>();
export const resetArena = ArenaDomain.createEvent();
export const $arena = ArenaDomain
  .createStore<Battle | null>(lastTx)
  .on(updateArena, (_, payload) => {
    window.localStorage.setItem(Contracts.FightPlace, JSON.stringify(payload));

    return payload;
  })
  .on(resetArena, () => {
    window.localStorage.removeItem(Contracts.FightPlace);

    return null;
  });
