import { createDomain } from 'effector';

const LIMIT = 10;

export interface Tx {
  hash: string;
  name: string;
  data: string;
  from: string;
  toAddr: string;
  timestamp: number;
}
let initState = [];
const txDomain = createDomain();

export const storageKey = 'transaction-listener';
export const pushToList = txDomain.createEvent<Tx>();

if (process.browser) {
  const catche = window.localStorage.getItem(storageKey);

  if (catche) {
    initState = JSON.parse(catche);
  }
}

export const $wallet = txDomain
  .createStore<Tx[]>(initState)
  .on(pushToList, (state, tx) => {
    if (state.length >= LIMIT) {
      state.pop();
    }

    const newState = [tx, ...state];

    window.localStorage.setItem(storageKey, JSON.stringify(newState));

    return newState;
  });
