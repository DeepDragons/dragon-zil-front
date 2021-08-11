import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Navbar } from 'components/nav-bar';
import { ActionBar } from 'components/dragon/action-bar';
import { Image } from 'components/card';
import { CombatGens } from 'components/dragon/combat-gens';
import { BodyParts } from 'components/dragon/body-parts';
import { BattlesSection } from 'components/dragon/battles';
import { ParentsSection } from 'components/dragon/parents';
import { Colors } from '@/config/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  max-width: 1024px;
  width: 100%;
`;
const DragonImage = styled(Image)`
  height: 300px;
  background: ${Colors.Secondary};
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
      <Wrapper>
        <DragonImage src="https://res.cloudinary.com/dragonseth/image/upload/1_3.png" />
        <div>
          <CombatGens gens={'74882138062254890663586233748589148886184661958565938896961482050151828829597'}/>
          <BodyParts />
          <BattlesSection win={250} lost={300}/>
          <ParentsSection first="300" second="230"/>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Dragon;
