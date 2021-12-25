import { createDomain } from "effector";
import { DragonObject } from "@/lib/api";

const dragonsDomain = createDomain();
export const updateDragons = dragonsDomain.createEvent<DragonObject[]>();
export const resetDragons = dragonsDomain.createEvent();
export const contctDragons = dragonsDomain.createEvent<DragonObject[]>();
export const contactDragons = dragonsDomain.createEvent<DragonObject[]>();
export const $myDragons = dragonsDomain
  .createStore<DragonObject[]>([])
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
