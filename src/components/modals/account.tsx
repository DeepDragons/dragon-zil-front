import React from 'react';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { CopyIcon } from 'components/icons/copy';
import { ViewIcon } from 'components/icons/view';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { trim } from '@/lib/trim';
import { viewAddress } from '@/lib/viewblock';

type Prop = {
  show: boolean;
  address?: string;
  onClose: () => void;
};

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
const TxContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 80px;
  background: ${Colors.Black};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const AccountModal: React.FC<Prop> = ({
  show,
  onClose,
  address = ''
}) => {

  return (
    <Modal
      show={show}
      title={(
        <Text css="padding: 16px;">
          Account
        </Text>
      )}
      width="450px"
      onClose={onClose}
    >
      <AccountContainer>
        <Text
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
          css="margin: 0;"
          size="16px"
        >
          Connectet with ZilPay wallet.
        </Text>
        <Text
          fontVariant={StyleFonts.FiraSansMedium}
          size="20px"
        >
          {address ? trim(address, 8) : ''}
        </Text>
        <Row>
          <CopyContainer>
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
            href={address ? viewAddress(address) : ''}
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
      <TxContainer>
        <Text
          fontVariant={StyleFonts.FiraSansRegular}
          size="16px"
          css="text-align: center;margin-top: 27px;"
        >
          Your transactions will appear here...
        </Text>
      </TxContainer>
    </Modal>
  );
};
