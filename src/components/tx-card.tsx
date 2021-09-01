import React from 'react';
import styled from 'styled-components';
import { Text } from 'components/text';
import { Colors } from 'config/colors';

type Prop = {
  value: number;
  max?: number;
  bg?: string | Colors;
  onInput: (value: number) => void
}

const Container = styled.div`
`;

export const TxCard: React.FC<Prop> = ({
}) => {
  return (
    <Container>
      
    </Container>
  );
};
