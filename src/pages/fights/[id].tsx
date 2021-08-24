import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { Text } from 'components/text';
import { ChoiceWith } from 'components/dragon/choice-with';
import { CompareCombatGens } from 'components/dragon/compare-combat-gens'; 

import { DragonAPI, DragonObject } from 'lib/api';
import { $dragonCache } from 'store/cache-dragon';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { getPrice } from 'lib/get-price';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  justify-content: space-evenly;
  width: 100%;
  padding-top: 30px;
  align-items: end;

  @media (max-width: 947px) {
    align-items: center;
    justify-content: center;
  }
`;
const PageTitle = styled(Text)`
  margin: 0;
  text-align: left;
  width: 100%;
  max-width: 1224px;

  span {
    color: ${Colors.Info};
  }
`;
const backend = new DragonAPI();
export const FightStart: NextPage = () => {
  const router = useRouter();

  const [defended, setDefended] = React.useState<DragonObject | null>(null);
  const [attacked, setAttacked] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);

  const amount = React.useMemo(() => {
    return getPrice(defended?.actions);
  }, [defended]);

  React.useEffect(() => {
    const cache = $dragonCache.getState();

    if (router.query.id && !cache) {
      backend
        .getDragon(String(router.query.id))
        .then((dragon) => {
          setDefended(dragon);
          setLoading(false);
        })
        .catch(() => setLoading(false));
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
          >
            Start Battle
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
