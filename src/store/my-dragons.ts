import { Rarity } from '@/config/rarity';
import { createDomain } from 'effector';

export interface Dragon {
  url: string;
  id: string;
  action: number;
  rarity: Rarity;
}

const dragonsDomain = createDomain();
export const updateDragons = dragonsDomain.createEvent<Dragon[]>();
export const resetDragons = dragonsDomain.createEvent();
export const contctDragons = dragonsDomain.createEvent<Dragon[]>();
export const contactDragons = dragonsDomain.createEvent<Dragon[]>();
export const $myDragons = dragonsDomain
  .createStore<Dragon[]>([])
  .on(resetDragons, () => [])
  .on(updateDragons, (_, payload) => payload)
  .on(contactDragons, (state, payload) => [...state, ...payload])
  .on(contctDragons, (state, list) => {
    list.forEach((item) => {
      const found = state.find((el) => item.id === el.id);

      if (!found) {
        state.push(item);
      }
    });

    return state;
  });
