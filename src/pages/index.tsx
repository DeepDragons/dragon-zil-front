import styled from 'styled-components';
import React from 'react';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

const Nav = styled.nav`
  max-width: 56em;
  margin: 0 auto;
  padding: 0.4em;
`;

export const MainPage: NextPage = () => (
  <>
    <BrowserView>
      <Nav />
      <h1> This is rendered only in browser </h1>
    </BrowserView>
    <MobileView>
      <h1> This is rendered only on mobile </h1>
    </MobileView>
  </>
);

export default MainPage;
