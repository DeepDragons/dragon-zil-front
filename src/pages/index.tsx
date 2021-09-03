import React from 'react';
import styled from 'styled-components';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  height: 100%;
`;
const Preview = styled.img`
  position: absolute;
  margin-top: 10%;
  z-index: -1;
`;

export const MainPage: NextPage = () => {
  const dragonsLocale = useTranslation('main');
  const commonLocale = useTranslation('common');

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {dragonsLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${dragonsLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      {/* <Preview
        src="/imgs/dragons.png"
        alt="Preview"
      /> */}
      <Text
        color={Colors.White}
        fontVariant={StyleFonts.FiraSansBold}
        size="42px"
        css="margin-top: 350px;"
      >
        {commonLocale.t('name')}
      </Text>
      <Text
        fontVariant={StyleFonts.FiraSansRegular}
        css="text-align: center;max-width: 400px;"
      >
        {dragonsLocale.t('description')}
      </Text>
      <Link href="/buy">
        <Button>
          {commonLocale.t('buy')}
        </Button>
      </Link>
    </Container>
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
