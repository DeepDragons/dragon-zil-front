import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { Text } from 'components/text';
import { ChoiceWith } from 'components/dragon/choice-with';

import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { $dragonCache } from 'store/cache-dragon';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

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
          css="margin: 0;"
        >
          Bread with #{router.query.id}
        </Text>
      </Wrapper>
      {dragon && rarity ? (
        <Wrapper>
          <ChoiceWith
            dragon={dragon}
            color={Colors.Primary}
          />
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default Dragon;
