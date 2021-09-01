import React from 'react';
import Loader from "react-loader-spinner";
import { useStore } from 'effector-react';
import copy from 'clipboard-copy';
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { CopyIcon } from 'components/icons/copy';
import { CloseIcon } from 'components/icons/close';
import { ViewIcon } from 'components/icons/view';
import { TxCard } from 'components/tx-card';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { trim } from '@/lib/trim';
import { viewAddress } from '@/lib/viewblock';
import { $transactions, resetTxList } from 'store/transactions';

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

  min-height: 80px;
  height: fit-content;
  padding: 16px;
  background: ${Colors.Black};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
const BetweenContainer = styled(Row)`
  justify-content: space-between;

  span {
    cursor: pointer;
    padding:16px;

    :hover {
      svg > path {
        stroke: ${Colors.Muted};
      }
    }
  }
`;

export const AccountModal: React.FC<Prop> = ({
  show,
  onClose,
  address = ''
}) => {
  const txList = useStore($transactions);

  return (
    <Modal
      show={show}
      title={(
        <BetweenContainer>
          <Text css="padding: 0 16px;">
            Account
          </Text>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </BetweenContainer>
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
          <CopyContainer onClick={() => copy(address)}>
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
        {txList.length === 0 ? (
          <Text
            fontVariant={StyleFonts.FiraSansRegular}
            size="16px"
            css="text-align: center;margin-top: 10px;"
          >
            Your transactions will appear here...
          </Text>
        ) : (
          <>
            <BetweenContainer>
              <Text
                fontVariant={StyleFonts.FiraSansRegular}
                size="16px"
                css=""
              >
                Recent Transactions
              </Text>
              <Text
                fontVariant={StyleFonts.FiraSansRegular}
                fontColors={Colors.Info}
                size="16px"
                css="cursor: pointer;user-select: none;"
                onClick={() => resetTxList()}
              >
                (clear all)
              </Text>
            </BetweenContainer>
            {txList.map((tx) => (
              <TxCard
                key={tx.hash}
                tx={tx}
              />
            ))}
          </>
        )}
      </TxContainer>
    </Modal>
  );
};
