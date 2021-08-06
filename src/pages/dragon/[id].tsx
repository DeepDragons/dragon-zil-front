import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Navbar } from 'components/nav-bar';
import { ActionBar } from 'components/dragon/action-bar';
import { CombatGens } from 'components/dragon/combat-gens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;

export const Dragon: NextPage = () => {
  return (
    <Container>
      <Navbar />
      <ActionBar
        id="2"
        transfer={() => console.log('transfer')}
        sale={() => console.log('sale')}
        mutate={() => console.log('mutate')}
        fight={() => console.log('fight')}
        breed={() => console.log('breed')}
        suicide={() => console.log('suicide')}
      />
      <CombatGens gens={'74882138062254890663586233748589148886184661958565938896961482050151828829597'}/>
    </Container>
  );
};

export default Dragon;
