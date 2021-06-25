import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

type Prop = {
  id: string;
};

export const ActionBar: React.FC<Prop> = ({ id }) => {
  return (
    <Container>
      <TitleWrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          size="50px"
          css="margin: 0;"
        >
          Dragon #{id}
        </Text>
        <Text
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
          size="18px"
          css="display: flex;align-items: center;justify-content: space-evenly;"
        >
          owner:
          <a href="">
            <Text fontColors={Colors.White}>
              You
            </Text>
          </a>
        </Text>
      </TitleWrapper>
    </Container>
  );
};
