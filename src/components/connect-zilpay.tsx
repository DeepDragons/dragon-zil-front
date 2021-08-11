import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from 'styled-components';

import Loader from "react-loader-spinner";
import { Button } from 'components/button';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';
import { ZilPayBase } from 'mixin/zilpay-base';
import { trim } from 'lib/trim';

const Container = styled.div`
  cursor: pointer;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansSemiBold};
`;

export const ConnectZIlPay: React.FC = () => {
  const [address, setAddress] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleConnect = React.useCallback(async() => {
    setLoading(true);
    try {
      const wallet = new ZilPayBase();
      const zp = await wallet.zilpay;

      const connected = await zp.wallet.connect();

      if (connected) {
        setAddress(zp.wallet.defaultAccount.bech32);
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
            setAddress(zp.wallet.defaultAccount.bech32)
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (address) {
    return (
      <Container>
        {trim(address)}
      </Container>
    );
  }

  return (
    <Button onClick={handleConnect}>
      {loading ? (
        <Loader
          type="ThreeDots"
          color="#fff"
          height={10}
          width={20}
        />
      ) : 'Connect'}
    </Button>
  );
};