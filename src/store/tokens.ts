import { createDomain } from "effector";

export interface TokensStore {
  amount: string;
}

const walletDomain = createDomain();
export const updateTokensStore = walletDomain.createEvent<string>();
export const $tokens = walletDomain
  .createStore<TokensStore>({
    amount: '0'
  })
  .on(updateTokensStore, (_, amount) => {
    return {
      amount
    };
  });
