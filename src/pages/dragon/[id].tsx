import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { ActionBar } from 'components/dragon/action-bar';
import { Image } from 'components/card';
import { CombatGens } from 'components/dragon/combat-gens';
import { BodyParts } from 'components/dragon/body-parts';
import { BattlesSection } from 'components/dragon/battles';
import { ParentsSection } from 'components/dragon/parents';
import { Colors } from '@/config/colors';
import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { EMPTY } from 'config/emty';

type DragonImageProp = {
  color: string;
}

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

  margin-top: 30px;
  max-width: 1024px;
  width: 100%;

  @media (max-width: 930px) {
    justify-content: center;
  }
`;
const DragonImage = styled(Image)`
  width: 500px;
  height: 500px;
  background: ${Colors.Secondary};

  @media (max-width: 530px) {
    width: 450px;
    height: 450px;
  }

  @media (max-width: 450px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 350px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 250px) {
    width: 150px;
    height: 150px;
  }

  :hover {
    box-shadow: inset 0 0 40px ${(p: DragonImageProp) => p.color};
  }
`;

const backend = new DragonAPI();

export const Dragon: NextPage = () => {
  const router = useRouter();

  const [dragon, setDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);

  const rarity = React.useMemo(() => {
    if (!dragon) {
      return null;
    }
    return getRarity(dragon.rarity, dragon.gen_image);
  }, [dragon]);

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
      {dragon && rarity ? (
        <ActionBar
          dragon={dragon}
          color={rarity.color}
          transfer={() => console.log('transfer')}
          sale={() => console.log('sale')}
          mutate={() => console.log('mutate')}
          fight={() => console.log('fight')}
          breed={() => console.log('breed')}
          suicide={() => console.log('suicide')}
        />
      ) : null}
      {dragon && rarity ? (
        <Wrapper>
          <DragonImage
            onError={(e) => e.currentTarget.src = EMPTY}
            src={dragon.url}
            color={rarity.color}
          />
          <div>
            <CombatGens
              gens={dragon.gen_fight}
              color={rarity.color}
            />
            <BodyParts
              gens={rarity.gensImage}
              color={rarity.color}
            />
            <BattlesSection
              color={rarity.color}
              win={dragon.fight_win}
              lost={dragon.fight_lose}
            />
            {Array(dragon.parents).length > 1 ? (
              <ParentsSection
                color={rarity.color}
                first="300"
                second="230"
              />
            ) : null}
          </div>
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default Dragon;
