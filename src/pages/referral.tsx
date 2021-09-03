import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useStore } from 'effector-react';
import copy from 'clipboard-copy';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { CopyIcon } from 'components/icons/copy';
import { LinePercent } from 'components/line-percent';
import { SkeletForm } from 'components/skelet/form';

import { Colors } from '@/config/colors';
import { $wallet } from 'store/wallet';
import { StyleFonts } from '@/config/fonts';
import { CrowdSale } from 'mixin/crowd-sale';

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

const crowdSale = new CrowdSale();
export const ReferralPage: NextPage = () => {
  const wallet = useStore($wallet);
  const [percent, setPercent] = React.useState(10);
  const [loading, setLoading] = React.useState(true);

  const refLink = React.useMemo(() => {
    return `https://dragonzil.xyz?ref=${wallet?.base16 || 'address'}`;
  }, [wallet]);

  React.useEffect(() => {
    if (wallet) {
      crowdSale
        .getReferralPercent(wallet.base16)
        .then((n) => {
          setPercent(n);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [wallet]);

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
        {loading ? (
          <SkeletForm />
        ) : (
          <ReferralContainer>
            <Text fontVariant={StyleFonts.FiraSansBold}>
              Your Referral Link
            </Text>
            <CopyContainer onClick={() => copy(refLink)}>
              <ReferralLink
                defaultValue={refLink}
                readOnly
              />
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
        )}
        {loading ? (
          <SkeletForm />
        ) : (
          <LevelContainer>
            <Text
              fontVariant={StyleFonts.FiraSansBold}
              size="20px"
            >
              Your Current Level
            </Text>
            <LevelWrapper>
              <Text>
                Level {(percent * 50 / 500).toFixed()}
              </Text>
              <LinePercent
                max={50}
                value={percent}
                color={Colors.Primary}
              />
              <Text>
                {percent}%
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
        )}
      </Wrapper>
    </Container>
  );
}

export default ReferralPage;
