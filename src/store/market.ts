import { createDomain } from "effector";
import { DragonObject } from "lib/api";

const marketDragonsDomain = createDomain();
export const updateMarketDragons = marketDragonsDomain.createEvent<DragonObject[]>();
export const resetMarketDragons = marketDragonsDomain.createEvent();
export const contactMarketDragons = marketDragonsDomain.createEvent<DragonObject[]>();
export const $marketDragons = marketDragonsDomain
  .createStore<DragonObject[]>([])
  .on(resetMarketDragons, () => [])
  .on(updateMarketDragons, (_, payload) => payload)
  .on(contactMarketDragons, (state, list) => {
    list.forEach((item) => {
      const found = state.find((el) => item.id === el.id);

      if (!found) {
        state.push(item);
      }
    });

    return state;
  });
