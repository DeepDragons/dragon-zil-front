import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useStore } from 'effector-react';
import styled from 'styled-components';

import Loader from "react-loader-spinner";

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';
import { ZilPayBase } from 'mixin/zilpay-base';
import { trim } from 'lib/trim';
import { $wallet, updateAddress } from 'store/wallet';

const ConnectButton = styled.div`
  cursor: pointer;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansSemiBold};

  padding: 10px 22px;
  border-radius: 16px;
  border: 1px solid ${Colors.Darker};
  background: ${Colors.Darker};
  user-select: none;
  min-width: 100px;
  text-align: center;

  :hover {
    border: 1px solid ${Colors.Muted};
  }
`;

export const ConnectZIlPay: React.FC = () => {
  const address = useStore($wallet);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  const handleConnect = React.useCallback(async() => {
    setLoading(true);
    try {
      const wallet = new ZilPayBase();
      const zp = await wallet.zilpay;

      const connected = await zp.wallet.connect();

      if (connected) {
        updateAddress(zp.wallet.defaultAccount);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    try {
      const wallet = new ZilPayBase();

      wallet
        .zilpay
        .then((zp) => {
          if (zp.wallet.defaultAccount) {
            updateAddress(zp.wallet.defaultAccount);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }, []);

  if (address) {
    return (
      <ConnectButton>
        {trim(address.bech32)}
      </ConnectButton>
    );
  }

  return (
    <>
      <ConnectButton onClick={handleConnect}>
        {loading ? (
          <Loader
            type="ThreeDots"
            color="#fff"
            height={10}
            width={20}
          />
        ) : 'Connect'}
      </ConnectButton>
    </>
  );
};
