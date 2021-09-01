import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { ChoiceWith } from 'components/dragon/choice-with';
import { BreadGensForm } from 'components/dragon/breed-gens';
import { CompareCombatGens } from 'components/dragon/compare-combat-gens'; 

import { DragonAPI, DragonObject } from 'lib/api';
import { BreedPlace } from 'mixin/breed';
import { getRarity } from 'lib/rarity';
import { $dragonCache } from 'store/cache-dragon';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { Wrapper, PageTitle } from 'components/dragon/styles';
import { getPrice } from '@/lib/get-price';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const backend = new DragonAPI();
const breedPlace = new BreedPlace();
export const BreedStart: NextPage = () => {
  const router = useRouter();

  const [dragon, setDragon] = React.useState<DragonObject | null>(null);
  const [myDragon, setMyDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleStartBreed = React.useCallback(async() => {
    if (!dragon || !myDragon) {
      return null;
    }
    setLoading(true);
    try {
      await breedPlace.startBreeding(dragon.id, myDragon.id);
    } catch {
      //
    }
    setLoading(false);
  }, [dragon, myDragon]);

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
  const amount = React.useMemo(() => {
    return getPrice(dragon?.actions);
  }, [dragon]);

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
        <PageTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="56px"
        >
          Bread with #{router.query.id}
        </PageTitle>
        <PageTitle
          fontVariant={StyleFonts.FiraSansMedium}
          size="21px"
        >
          Price <span>{Number(amount) / 10**18} $ZLP</span>
        </PageTitle>
      </Wrapper>
      {dragon && rarityLover ? (
        <Wrapper>
          <ChoiceWith
            dragon={dragon}
            myDragon={myDragon}
            color={Colors.Primary}
            btnColor={Colors.Primary}
            icon="heart.svg"
            setDragon={setMyDragon}
            onStart={handleStartBreed}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : 'Start Breeding'}
          </ChoiceWith>
          {myDragon && rarityMyDragon && rarityLover ? (
            <Column>
              <CompareCombatGens
                loverDragon={dragon}
                myDragon={myDragon}
                color={Colors.Muted}
              />
              <BreadGensForm
                loverId={dragon.id}
                myDragonId={myDragon.id}
                myDragon={rarityMyDragon}
                lover={rarityLover}
              />
            </Column>
          ) : null}
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default BreedStart;
