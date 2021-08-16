import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { ActionBar } from 'components/dragon/action-bar';
import { CombatGens } from 'components/dragon/combat-gens';
import { BodyParts } from 'components/dragon/body-parts';
import { BattlesSection } from 'components/dragon/battles';
import { ParentsSection } from 'components/dragon/parents';
import { DragonImage } from 'components/dragon/dragon-image';
import { Container } from 'components/pages/container';

import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { updateCache } from 'store/cache-dragon';
import { EMPTY } from 'config/emty';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1039px;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;

  @media (max-width: 947px) {
    align-items: center;
    justify-content: center;
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

  const hanldeMutate = React.useCallback(() => {
    if (dragon) {
      updateCache(dragon);
      router.push(`/mutate/${dragon.id}`);
    }
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
          RemoveSale={() => console.log('remove sale')}
          mutate={hanldeMutate}
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
