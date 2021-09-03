import React from 'react';
import copy from 'clipboard-copy';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { CopyIcon } from 'components/icons/copy';
import { ViewIcon } from 'components/icons/view';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { trim } from '@/lib/trim';
import { viewAddress } from '@/lib/viewblock';
import { Wallet } from '@/store/wallet';
import { $net } from 'store/wallet-netwrok';

const AccountContainer = styled.div`
  margin: 16px;
  padding: 5px 30px;

  border: 1px solid ${Colors.Muted};
  border-radius: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  .second {
    margin-left: 16px;
  }
`;
const CopyContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  user-select: none;

  :hover {
    svg {
      stroke: #a1a1b5;
    }
    div {
      color: #a1a1b5;
    }
  }
`;

type Prop = {
  wallet: Wallet | null;
}

export const AccountCard: React.FC<Prop> = ({
  wallet
}) => {
  const netwrok = useStore($net);

  const netColor = React.useMemo(() => {
    return netwrok === 'mainnet' ? Colors.Muted : Colors.Danger;
  }, [netwrok]);

  return (
    <AccountContainer>
      <Text
        fontColors={netColor}
        fontVariant={StyleFonts.FiraSansRegular}
        css="margin: 0;"
        size="16px"
      >
        Connectet with ZilPay wallet to {netwrok}.
      </Text>
      <Text
        fontVariant={StyleFonts.FiraSansMedium}
        size="20px"
      >
        {wallet ? trim(wallet.bech32, 8) : ''}
      </Text>
      <Row>
        <CopyContainer onClick={() => copy(String(wallet?.bech32))}>
          <CopyIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            Copy address
          </Text>
        </CopyContainer>
        <CopyContainer
          className="second"
          href={wallet ? viewAddress(String(wallet?.bech32)) : ''}
          target="_blank"
        >
          <ViewIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            View on Explorer
          </Text>
        </CopyContainer>
      </Row>
    </AccountContainer>
  );
};
