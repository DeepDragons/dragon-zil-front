import React from 'react';
import styled from 'styled-components';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { MainSection } from 'components/section/main';
import { DescriptionSection } from 'components/section/description';
import { HowWorksSection } from 'components/section/how-it-works';
// import { ReferralSection } from 'components/section/referral';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  height: 100%;
`;

export const MainPage: NextPage = () => {
  const mainLocale = useTranslation('main');
  const commonLocale = useTranslation('common');

  return (
    <>
      <Head>
        <title>
          {commonLocale.t('name')} | {mainLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${mainLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Container>
        <Navbar />
        <MainSection />
        <DescriptionSection />
        <HowWorksSection />
        {/* <ReferralSection /> */}
      </Container>
    </>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'main']),
    }
  };
};

export default MainPage;
