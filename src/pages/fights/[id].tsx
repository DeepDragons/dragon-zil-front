import React from 'react';
import { NextPage } from 'next';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { ChoiceWith } from 'components/dragon/choice-with';
import { CompareCombatGens } from 'components/dragon/compare-combat-gens'; 
import { Wrapper, PageTitle } from 'components/dragon/styles';

import { DragonAPI, DragonObject } from 'lib/api';
import { FigthPlace } from 'mixin/fight-place';
import { $dragonCache } from 'store/cache-dragon';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { getPrice } from 'lib/get-price';

const backend = new DragonAPI();
const figthPlace = new FigthPlace();
export const FightStart: NextPage = () => {
  const router = useRouter();

  const [defended, setDefended] = React.useState<DragonObject | null>(null);
  const [attacked, setAttacked] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [skelet, setSkelet] = React.useState(true);

  const amount = React.useMemo(() => {
    return getPrice(defended?.actions);
  }, [defended]);

  const handleStartFight = React.useCallback(async() => {
    if (!attacked || !defended) {
      return null;
    }
    setLoading(true);
    try {
      await figthPlace.startFight(defended.id, attacked.id);
    } catch {
      //
    }
    setLoading(false);
  }, [defended, attacked]);

  React.useEffect(() => {
    const cache = $dragonCache.getState();

    if (router.query.id && !cache) {
      backend
        .getDragon(String(router.query.id))
        .then((dragon) => {
          setDefended(dragon);
          setSkelet(false);
        })
        .catch(() => setSkelet(false));
    }

    if (cache) {
      setDefended(cache);
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
          Battle with #{router.query.id}
        </PageTitle>
        <PageTitle
          fontVariant={StyleFonts.FiraSansMedium}
          size="21px"
        >
          Price <span>{Number(amount) / 10**18} $ZLP</span>
        </PageTitle>
      </Wrapper>
      {defended ? (
        <Wrapper>
          <ChoiceWith
            dragon={defended}
            myDragon={attacked}
            color={Colors.Danger}
            btnColor={Colors.Info}
            icon="arena.svg"
            setDragon={setAttacked}
            onStart={handleStartFight}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : 'Start Battle'}
          </ChoiceWith>
          {attacked ? (
            <CompareCombatGens
              loverDragon={defended}
              myDragon={attacked}
              color={Colors.Danger}
            />
          ) : null}
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default FightStart;
