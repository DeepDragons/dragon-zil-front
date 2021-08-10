import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';

import { Text } from 'components/text';
import { Column } from 'components/column';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  background: ${Colors.Secondary};

  border: 1px solid #FFB411;
  box-sizing: border-box;
  border-radius: 16px;

  padding: 41px;
  margin-bottom: 30px;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-left: 10px;
  }
`;

type Prop = {
};

export const BodyParts: React.FC<Prop> = () => {
  return (
    <Container>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
        >
          Body parts
        </Text>
        <img
          src="/icons/body.svg"
          alt="body"
        />
      </TitleRow>
    </Container>
  );
};
