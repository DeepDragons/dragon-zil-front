import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { CloseIcon } from 'components/icons/close';
import { TxCard } from 'components/tx-card';
import { AccountCard } from '@/components/account-card';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { $transactions, resetTxList } from 'store/transactions';
import { Wallet } from '@/store/wallet';

type Prop = {
  show: boolean;
  address: Wallet | null;
  onClose: () => void;
};

const TxContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 80px;
  height: fit-content;
  padding: 16px;
  background: ${Colors.Black};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
const Between = styled.div`
  display: flex;
  align-items: flex-start;
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
  address
}) => {
  const txList = useStore($transactions);

  return (
    <Modal
      show={show}
      title={(
        <Between>
          <Text css="padding: 0 16px;">
            Account
          </Text>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </Between>
      )}
      width="450px"
      onClose={onClose}
    >
      <AccountCard wallet={address}/>
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
          <div>
            <div className="header">
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
                onClick={() => resetTxList(String(address?.base16))}
              >
                (clear all)
              </Text>
            </div>
            {txList.map((tx) => (
              <TxCard
                key={tx.hash}
                tx={tx}
              />
            ))}
          </div>
        )}
      </TxContainer>
    </Modal>
  );
};
