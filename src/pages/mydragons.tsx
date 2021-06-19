import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Navbar } from 'components/nav-bar';
import { FilterBar } from 'components/filter-bar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

export const MyDragons: NextPage = () => (
  <>
    <BrowserView>
      <Container>
        <Navbar />
        <FilterBar
          title="My dragons"
        />
      </Container>
    </BrowserView>
    <MobileView>
      <Container>
        <h1> This is rendered only in mobile </h1>
      </Container>
    </MobileView>
  </>
);

export default MyDragons;
