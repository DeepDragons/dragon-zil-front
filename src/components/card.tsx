import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

type Prop = {
  dragon: {
    url: string;
    id: string;
    type: number;
  }
};

const Container = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 16px;
  margin: 16px;
  border-radius: 16px;
  
  background: ${Colors.Darker};
`;
const Image = styled.img`
  border-radius: 100%;
  background: ${Colors.Black};
`;

export const Card: React.FC<Prop> = ({
  dragon
}) => {

  return (
    <Container>
      <Image
        src={dragon.url}
        height="250"
        width="250"
      />
      <Text
        fontVariant={StyleFonts.FiraSansBold}
      >
        #{dragon.id}
      </Text>
    </Container>
  );
};
