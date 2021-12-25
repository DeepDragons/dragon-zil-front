import { createDomain } from "effector";
import { DragonObject } from "lib/api";

const cacheDragonDomain = createDomain();
export const updateCache = cacheDragonDomain.createEvent<DragonObject>();
export const $dragonCache = cacheDragonDomain
  .createStore<DragonObject | null>(null)
  .on(updateCache, (_, payload) => payload);
