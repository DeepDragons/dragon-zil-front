import { createDomain } from 'effector';
import { DragonObject } from 'lib/api';

const breedDragonsDomain = createDomain();
export const updateBreedDragons = breedDragonsDomain.createEvent<DragonObject[]>();
export const resetBreedDragons = breedDragonsDomain.createEvent();
export const contactBreedDragons = breedDragonsDomain.createEvent<DragonObject[]>();
export const $BreedDragons = breedDragonsDomain
  .createStore<DragonObject[]>([])
  .on(resetBreedDragons, () => [])
  .on(updateBreedDragons, (_, payload) => payload)
  .on(contactBreedDragons, (state, list) => {
    list.forEach((item) => {
      const found = state.find((el) => item.id === el.id);

      if (!found) {
        state.push(item);
      }
    });

    return state;
  });
