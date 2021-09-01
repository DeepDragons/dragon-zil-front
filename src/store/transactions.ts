import { createDomain } from 'effector';

const LIMIT = 10;

export interface Tx {
  hash: string;
  name: string;
  data: string;
  from: string;
  value?: string;
  toAddr: string;
  timestamp: number;
  confirmed: boolean;
  id?: string;
}
let initState: Tx[] = [
  {
    hash: 'be61588f7502070da9af36fe78f9e60124282688b51ca922baafe3cacf2ba542',
    name: 'Approve',
    data: '',
    value: '100 ZLP',
    from: '',
    toAddr: '',
    confirmed: false,
    id: '300',
    timestamp: new Date().getTime()
  },
  {
    hash: '73e6b6384afd11b1638fa04eecca8d605f6fb62c427a011f8aa874a873ce596b',
    name: 'Breed',
    data: '',
    from: '',
    value: '1 ZIL',
    toAddr: '',
    id: '3123',
    confirmed: true,
    timestamp: new Date().getTime()
  }
];
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
