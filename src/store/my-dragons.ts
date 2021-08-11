import { createDomain } from 'effector';

const dragonsDomain = createDomain();
export const updateDragons = dragonsDomain.createEvent<string[]>();
export const contactDragons = dragonsDomain.createEvent<string[]>();
export const $myDragons = dragonsDomain
  .createStore<string[]>([])
  .on(updateDragons, (_, payload) => payload)
  .on(contactDragons, (state, payload) => [...state, ...payload]);
