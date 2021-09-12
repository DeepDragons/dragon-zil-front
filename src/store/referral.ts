import { createDomain } from 'effector';
import { Contracts } from 'config/contracts';

const refDomain = createDomain();
const key = 'referral';
let initState = String(Contracts.NIL);

if (process.browser) {
  const storageRef = window.localStorage.getItem(key);

  if (storageRef) {
    initState = storageRef;
  }
}

export const updateRef = refDomain.createEvent<string>();
export const $referral = refDomain
  .createStore<string>(initState)
  .on(updateRef, (_, payload) => {
    window.localStorage.setItem(key, payload);

    return payload;
  });
