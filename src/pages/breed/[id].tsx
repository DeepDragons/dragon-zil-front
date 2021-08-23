import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { Text } from 'components/text';
import { ChoiceWith } from 'components/dragon/choice-with';
import { BreadGensForm } from 'components/dragon/breed-gens';

import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { $dragonCache } from 'store/cache-dragon';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  justify-content: space-evenly;
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
  const [myDragon, setMyDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);

  const rarityLover = React.useMemo(() => {
    if (!dragon) {
      return null;
    }
    return getRarity(dragon.rarity, dragon.gen_image);
  }, [dragon]);
  const rarityMyDragon = React.useMemo(() => {
    if (!myDragon) {
      return null;
    }
    return getRarity(myDragon.rarity, myDragon.gen_image);
  }, [myDragon]);

  React.useEffect(() => {
    const cache = $dragonCache.getState();

    if (router.query.id && !cache) {
      backend
        .getDragon(String(router.query.id))
        .then((dragon) => {
          setDragon(dragon);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    if (cache) {
      setDragon(cache);
    }
  }, [router.query.id]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          size="56px"
          css="margin: 0;text-align: left;width: 100%;"
        >
          Bread with #{router.query.id}
        </Text>
      </Wrapper>
      {dragon && rarityLover ? (
        <Wrapper>
          <ChoiceWith
            dragon={dragon}
            myDragon={myDragon}
            color={Colors.Muted}
            setDragon={setMyDragon}
          >
            Start breeding
          </ChoiceWith>
          {myDragon && rarityMyDragon && rarityLover ? (
            <BreadGensForm
              loverId={dragon.id}
              myDragonId={myDragon.id}
              myDragon={rarityMyDragon}
              lover={rarityLover}
            />
          ) : null}
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default Dragon;
