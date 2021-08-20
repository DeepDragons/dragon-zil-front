import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { Tab } from 'components/tab';
import { IntInput } from 'components/int-input';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  justify-content: space-between;
`;
const Main = styled.div`
  height: 70vh;
`;
const Form = styled.form`
  background: ${Colors.Secondary};
  padding: 36px;
  border-radius: 16px;
  max-width: 900px;
  width: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;
const BuyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  min-width: 235px;
  padding: 16px;
`;

const tokens = [
  <Text fontVariant={StyleFonts.FiraSansSemiBold}>
    ZIL
  </Text>,
  <Text fontVariant={StyleFonts.FiraSansSemiBold}>
    ZLP
  </Text>
];

export const BuyPage: NextPage = () => {
  const [selected, setSelected] = React.useState(0);
  const [eggs, setEggs] = React.useState(1);

  return (
    <Container>
      <Navbar />
      <Main>
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
          <Wrapper>
            <Tab
              elements={tokens}
              selected={selected}
              onSelected={setSelected}
            >
              Choose token
            </Tab>
            <IntInput
              value={eggs}
              onInput={setEggs}
            >
              Number of eggs
            </IntInput>
            <BuyButton>
              Buy for  {eggs * 10} ${tokens[selected]}
            </BuyButton>
          </Wrapper>
        </Form>
      </Main>
    </Container>
  );
}

export default BuyPage;
