import { createDomain } from 'effector';

const LIMIT = 10;

export interface Tx {
  hash: string;
  name: string;
  from: string;
  timestamp: number;
  confirmed: boolean;
}
let initState: Tx[] = [];
const txDomain = createDomain();

export const storageKey = 'transaction-listener';
export const pushToList = txDomain.createEvent<Tx>();
export const resetTxList = txDomain.createEvent();

if (process.browser) {
  const catche = window.localStorage.getItem(storageKey);

  if (catche) {
    initState = JSON.parse(catche);
  }
}

export const $transactions = txDomain
  .createStore<Tx[]>(initState)
  .on(resetTxList, (_) => {
    window.localStorage.removeItem(storageKey);

    return [];
  })
  .on(pushToList, (state, tx) => {
    if (state.length >= LIMIT) {
      state.pop();
    }

    const newState = [tx, ...state];

    window.localStorage.setItem(storageKey, JSON.stringify(newState));

    return newState;
  });
