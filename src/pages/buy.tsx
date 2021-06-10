import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  justify-content: space-between;
`;
const Form = styled.form`
  background: ${Colors.Secondary};
  padding: 36px;
  border-radius: 16px;
  max-width: 599px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BuyPage: NextPage = () => (
  <Container>
    <Navbar />
    <Form>
      <TitleWrapper>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
          css="margin-right: 10px;"
        >
          Buy eggs
        </Text>
        <img
          src="/icons/egg.svg"
          alt="egg"
        />
      </TitleWrapper>
    </Form>
  </Container>
);

export default BuyPage;
