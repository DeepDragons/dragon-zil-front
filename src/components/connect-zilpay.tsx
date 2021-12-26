import React from "react";
import { useStore } from "effector-react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import Loader from "react-loader-spinner";
import { MobileNavigate } from "components/mobile/navigate";
import { AccountModal } from "components/modals/account";
import { Text } from "components/text";
import { WalletErrorModal } from "components/modals/no-wallet";

import { StyleFonts } from "config/fonts";
import { Colors } from "config/colors";
import { ZilPayBase } from "mixin/zilpay-base";
import { trim } from "lib/trim";
import { $wallet, updateAddress, Wallet } from "store/wallet";
import {
  $transactions,
  updateTxList,
  clearTxList,
  writeNewList,
} from "store/transactions";
import { updateNet, $net } from "store/wallet-netwrok";
import { Blockchain } from "mixin/custom-fetch";
import { Block, Net } from "@/types/zil-pay";
import { $arena, updateArena, resetArena } from "@/store/arena";

type ConnectZIlPayButtonProp = {
  color: Colors | string;
};

const ConnectZIlPayButton = styled.button`
  cursor: pointer;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansSemiBold};
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px 22px;
  border-radius: 16px;
  border: 1px solid ${Colors.Darker};
  background: ${(p: ConnectZIlPayButtonProp) => p.color};
  user-select: none;
  min-width: 100px;
  text-align: center;

  :hover {
    border: 1px solid ${Colors.Muted};
  }
`;

let observer: any = null;
let observerNet: any = null;
let observerBlock: any = null;
const blockchain = new Blockchain();
export var ConnectZIlPay: React.FC = function () {
  const address = useStore($wallet);
  const net = useStore($net);
  const transactions = useStore($transactions);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(``);

  const btnColor = React.useMemo(
    () => (net === `mainnet` ? Colors.Darker : Colors.Danger),
    [net],
  );
  const isLoading = React.useMemo(
    () => transactions.filter((tx) => !tx.confirmed).length === 0,
    [transactions],
  );

  const hanldeObserverState = React.useCallback(
    (zp) => {
      updateNet(zp.wallet.net);

      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observer) {
        observer.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }

      observerNet = zp.wallet.observableNetwork().subscribe((net: Net) => {
        updateNet(net);
      });

      observer = zp.wallet.observableAccount().subscribe((acc: Wallet) => {
        const address = $wallet.getState();

        if (address?.base16 !== acc.base16) {
          updateAddress(acc);
        }

        clearTxList();

        const cache = window.localStorage.getItem(
          String(zp.wallet.defaultAccount?.base16),
        );

        if (cache) {
          updateTxList(JSON.parse(cache));
        }
      });

      observerBlock = zp.wallet
        .observableBlock()
        .subscribe(async (block: Block) => {
          let list = $transactions.getState();
          const arena = $arena.getState();

          const params = list
            .filter((tx) => !tx.confirmed)
            .map((tx) => tx.hash);

          if (params.length === 0) {
            return null;
          }

          const res = await blockchain.getTransaction(...params);
          list = list.map((tx) => {
            try {
              const found = res.find((r: any) => r.result.ID === tx.hash);

              if (found) {
                const { success, errors } = found.result.receipt;
                tx.confirmed = true;

                if (!success && errors) {
                  tx.error = true;
                }

                try {
                  if (arena?.hash === found.result.ID && arena) {
                    const [afterFightWinLose] = found.result.receipt.event_logs;
                    const [won] = afterFightWinLose.params;

                    updateArena({
                      ...arena,
                      winner: won.value,
                    });
                  }
                } catch (err) {
                  console.log(`arena`, err);
                  resetArena();
                }
              }
            } catch (err) {
              console.log(`check txns`, err);
            }

            return tx;
          });
          writeNewList(list);
        });

      if (zp.wallet.defaultAccount) {
        updateAddress(zp.wallet.defaultAccount);
      }

      const cache = window.localStorage.getItem(
        String(zp.wallet.defaultAccount?.base16),
      );

      if (cache) {
        updateTxList(JSON.parse(cache));
      }
    },
    [transactions],
  );
  const handleConnect = React.useCallback(async () => {
    setLoading(true);
    try {
      const wallet = new ZilPayBase();
      const zp = await wallet.zilpay();
      const connected = await zp.wallet.connect();

      if (connected && zp.wallet.defaultAccount) {
        updateAddress(zp.wallet.defaultAccount);
      }

      updateNet(zp.wallet.net);

      const cache = window.localStorage.getItem(
        String(zp.wallet.defaultAccount?.base16),
      );

      if (cache) {
        updateTxList(JSON.parse(cache));
      }
    } catch (err) {
      setError(String((err as any).message));
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const wallet = new ZilPayBase();

    wallet
      .zilpay()
      .then((zp) => {
        hanldeObserverState(zp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    return () => {
      if (observer) {
        observer.unsubscribe();
      }
      if (observerNet) {
        observerNet.unsubscribe();
      }
      if (observerBlock) {
        observerBlock.unsubscribe();
      }
    };
  }, []);

  if (address && isMobile) {
    return (
      <>
        <div onClick={() => setShowModal(true)}>
          <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
            <path
              d="M0 1H32M0 13H32M0 25H32"
              stroke={Colors.White}
              strokeWidth="2"
            />
          </svg>
        </div>
        <MobileNavigate
          show={showModal}
          loading={!isLoading}
          wallet={address}
          onConnect={handleConnect}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }

  return (
    <>
      {address ? (
        <ConnectZIlPayButton
          color={btnColor}
          onClick={() => setShowModal(true)}
        >
          {isLoading ? (
            trim(address.bech32)
          ) : (
            <>
              <Loader type="Puff" color={Colors.White} height={10} width={10} />
              <Text size="16px" css="text-indent: 5px;margin: 0;">
                Pending...
              </Text>
            </>
          )}
        </ConnectZIlPayButton>
      ) : (
        <ConnectZIlPayButton color={btnColor} onClick={handleConnect}>
          {loading ? (
            <Loader type="ThreeDots" color="#fff" height={10} width={20} />
          ) : (
            `Connect`
          )}
        </ConnectZIlPayButton>
      )}
      <AccountModal
        show={showModal}
        address={address}
        onClose={() => setShowModal(false)}
      />
      <WalletErrorModal
        show={Boolean(error)}
        message={error}
        onClose={() => setError(``)}
      />
    </>
  );
};
