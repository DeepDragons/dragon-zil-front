import { Rarity } from '@/config/rarity';
import { createDomain } from 'effector';

export interface Dragon {
  url: string;
  id: string;
  type: number;
  rarity: Rarity;
}

const dragonsDomain = createDomain();
export const updateDragons = dragonsDomain.createEvent<Dragon[]>();
export const contactDragons = dragonsDomain.createEvent<Dragon[]>();
export const $myDragons = dragonsDomain
  .createStore<Dragon[]>([])
  .on(updateDragons, (_, payload) => payload)
  .on(contactDragons, (state, payload) => [...state, ...payload]);
