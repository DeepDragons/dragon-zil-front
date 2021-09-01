import Loader from 'react-loader-spinner';
import React from 'react';
import styled from 'styled-components';
import { Colors } from 'config/colors';
import { Tx } from 'store/transactions';
import { viewTransaction } from 'lib/viewblock';
import { SuccessIcon } from 'components/icons/success';

type Prop = {
  tx: Tx;
}

const Transaction = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 5px;
`;
const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${Colors.LightBlue};
  text-decoration-thickness: .125em;
  text-underline-offset: 1.5px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
    color: ${Colors.LightBlue};
  }
`;
const TextWrapper = styled.div`
  font-size: 0.825rem;
`;

export const TxCard: React.FC<Prop> = ({
  tx
}) => {
  return (
    <Transaction
      href={viewTransaction(tx.hash)}
      target="_blank"
    >
      <Wrapper>
        <TextWrapper>
          {tx.name} ↗
        </TextWrapper>
      </Wrapper>
      {tx.confirmed ? (
        <SuccessIcon />
      ) : (
        <Loader
          type="Puff"
          color={Colors.Warning}
          height={16}
          width={16}
        />
      )}
    </Transaction>
  );
};
