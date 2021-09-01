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

export const updateTxList = txDomain.createEvent<Tx[]>();
export const pushToList = txDomain.createEvent<Tx>();
export const resetTxList = txDomain.createEvent<string>();
export const clearTxList = txDomain.createEvent();

export const $transactions = txDomain
  .createStore<Tx[]>(initState)
  .on(clearTxList, () => [])
  .on(updateTxList, (_, payload) => payload)
  .on(resetTxList, (_, address) => {
    window.localStorage.removeItem(address);

    return [];
  })
  .on(pushToList, (state, tx) => {
    if (state.length >= LIMIT) {
      state.pop();
    }

    const newState = [tx, ...state];

    window.localStorage.setItem(tx.from, JSON.stringify(newState));

    return newState;
  });
