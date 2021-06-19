import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Navbar } from 'components/nav-bar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;

export const Dragon: NextPage = () => (
  <>
    <BrowserView>
      <Container>
        <Navbar />
      </Container>
    </BrowserView>
    <MobileView>
      <Container>
        <h1> This is rendered only in mobile </h1>
      </Container>
    </MobileView>
  </>
);

export default Dragon;
