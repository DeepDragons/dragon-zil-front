import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BrowserView, MobileView } from 'react-device-detect';

import { Navbar } from 'components/nav-bar';
import { ActionBar } from 'components/dragon/action-bar';
import { Image } from 'components/card';
import { CombatGens } from 'components/dragon/combat-gens';
import { BodyParts } from 'components/dragon/body-parts';
import { BattlesSection } from 'components/dragon/battles';
import { ParentsSection } from 'components/dragon/parents';
import { Colors } from '@/config/colors';
import { DragonAPI, DragonObject } from 'lib/api';

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

const backend = new DragonAPI();

export const Dragon: NextPage = () => {
  const router = useRouter();

  const [dragon, setDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (router.query.id) {
      backend
        .getDragon(String(router.query.id))
        .then((dragon) => {
          setDragon(dragon);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [router.query.id]);

  return (
    <Container>
      <Navbar />
      <ActionBar
        id={dragon && dragon['id'] || ''}
        transfer={() => console.log('transfer')}
        sale={() => console.log('sale')}
        mutate={() => console.log('mutate')}
        fight={() => console.log('fight')}
        breed={() => console.log('breed')}
        suicide={() => console.log('suicide')}
      />
      {dragon ? (
        <Wrapper>
          <DragonImage src={dragon.url} />
          <div>
            <CombatGens gens={dragon.gen_fight}/>
            <BodyParts />
            <BattlesSection win={dragon.fight_win} lost={dragon.fight_lose}/>
            {Array(dragon.parents).length > 1 ? (
              <ParentsSection first="300" second="230"/>
            ) : null}
          </div>
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default Dragon;
