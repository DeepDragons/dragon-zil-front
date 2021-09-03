import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Link from 'next/link';
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

export const MainPage: NextPage = () => (
  <Container>
    <Head>
      <title>
        DragonZIL
      </title>
      <meta
        property="og:title"
        content="DragonZIL"
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
      DragonZIL
    </Text>
    <Text
      fontVariant={StyleFonts.FiraSansRegular}
      css="text-align: center;max-width: 400px;"
    >
      Here, you can buy Dragons for ZIL, and they will mate, fight, mutаte and die. Because Dragons are no Kitties.
    </Text>
    <Link href="/buy">
      <Button>
        Buy
      </Button>
    </Link>
  </Container>
);

export default MainPage;
