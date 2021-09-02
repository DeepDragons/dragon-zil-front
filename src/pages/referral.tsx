import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import copy from 'clipboard-copy';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { CopyIcon } from 'components/icons/copy';
import { LinePercent } from 'components/line-percent';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  width: 100%;
  max-width: 1024px;
`;
const ReferralContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${Colors.Primary};
  padding: 30px;
`;
const LevelContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${Colors.Primary};
  padding: 30px;
`;
const LevelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 280px;
  border-bottom: 1px solid ${Colors.Primary};
`;
const CopyContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 5px;
  }
`;
const ReferralLink = styled.input`
  background: ${Colors.Secondary};
  border: 0;
  border: 1px solid ${Colors.Black};
  border-radius: 16px;
  color: ${Colors.White};
  outline: none;
  padding: 10px;
  min-width: 260px;
  width: 100%;

  :focus {
    border: 1px solid ${Colors.Primary};
  }
`;


export const ReferralPage: NextPage = () => {
  const [level, setlevel] = React.useState(1);

  return (
    <Container>
      <Head>
        <title>
          DragonZIL | referral
        </title>
        <meta
          property="og:title"
          content="DragonZIL | referral"
          key="title"
        />
      </Head>
      <Navbar />
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="32px"
        css="width: 100%;max-width: 1024px;"
      >
        Referral
      </Text>
      <Wrapper>
        <ReferralContainer>
          <Text fontVariant={StyleFonts.FiraSansBold}>
            Your Referral Link
          </Text>
          <CopyContainer onClick={() => copy('')}>
            <ReferralLink value="qwertyr12393...............ffjjkfdf" />
            <CopyIcon />
          </CopyContainer>
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            size="16px"
            css="max-width: 400px;"
          >
            Referral link - when somebody will buy eggs using it, you will get from 10% up to 50% of the purchase amount to your wallet. The basic level starts at 10% and then increased by 1%  to a maximum of 50%.
          </Text>
        </ReferralContainer>
        <LevelContainer>
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            size="20px"
          >
            Your Current Level
          </Text>
          <LevelWrapper>
            <Text>
              Level {level}
            </Text>
            <LinePercent
              max={50}
              value={Number(10)}
              color={Colors.Primary}
            />
            <Text>
              10%
            </Text>
          </LevelWrapper>
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            size="16px"
          >
            If someone bought by your link your level going to up
          </Text>
        </LevelContainer>
      </Wrapper>
    </Container>
  );
}

export default ReferralPage;
