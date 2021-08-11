import { createDomain } from 'effector';

const walletDomain = createDomain();
export const updateAddress = walletDomain.createEvent<string>();
export const $wallet = walletDomain
  .createStore<string | null>(null)
  .on(updateAddress, (_, payload) => payload);
