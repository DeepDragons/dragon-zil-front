import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';
import Link from 'next/link';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;
const Preview = styled.img`
  position: absolute;
  margin-top: 10%;
  z-index: -1;
`;

export const MainPage: NextPage = () => (
  <>
    <BrowserView>
      <Container>
        <Navbar />
        <Preview
          src="/imgs/dragons.png"
          alt="Preview"
        />
        <Text
          color={Colors.White}
          fontVariant={StyleFonts.FiraSansBold}
          size="8rem"
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
    </BrowserView>
    <MobileView>
      <Container>
        <h1> This is rendered only in mobile </h1>
      </Container>
    </MobileView>
  </>
);

export default MainPage;
