import React from 'react';
import styled from 'styled-components';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useStore } from 'effector-react';
import copy from 'clipboard-copy';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
  min-height: 90vh;
  height: 100%;
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
  margin: 10px;
`;
const LevelContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${Colors.Primary};
  padding: 30px;
  margin: 10px;
  min-width: 250px;
`;
const LevelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
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
  min-width: 200px;
  width: 100%;

  :focus {
    border: 1px solid ${Colors.Primary};
  }
`;

const crowdSale = new CrowdSale();
export const ReferralPage: NextPage = () => {
  const referralLocale = useTranslation('referral');
  const commonLocale = useTranslation('common');
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
          {commonLocale.t('name')} | {referralLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${referralLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="32px"
        css="width: 100%;max-width: 1024px;"
      >
        {referralLocale.t('title')}
      </Text>
      <Wrapper>
        {loading ? (
          <SkeletForm />
        ) : (
          <ReferralContainer>
            <Text fontVariant={StyleFonts.FiraSansBold}>
              {referralLocale.t('link_title')}
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
              {referralLocale.t('mechanism')}
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
              {referralLocale.t('level_title')}
            </Text>
            <LevelWrapper>
              <Text>
                {referralLocale.t('level')} {(percent * 50 / 500).toFixed()}
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
              css="text-align: center;"
            >
              {referralLocale.t('level_mechanism')}
            </Text>
          </LevelContainer>
        )}
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'referral'])
    }
  };
};

export default ReferralPage;
