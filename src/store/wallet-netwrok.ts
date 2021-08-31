import { createDomain } from 'effector';
import { Net } from 'types/zil-pay';

const netDomain = createDomain();
export const updateNet = netDomain.createEvent<Net>();
export const $net = netDomain
  .createStore<Net>('mainnet')
  .on(updateNet, (_, payload) => payload);
