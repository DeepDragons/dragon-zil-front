import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';
import { DragonImage } from 'components/dragon/dragon-image';
import { Navbar } from 'components/nav-bar';

import { EMPTY } from 'config/emty';
import { $dragonCache } from 'store/cache-dragon';
import { DragonAPI, DragonObject } from '@/lib/api';
import { getRarity } from '@/lib/rarity';

const backend = new DragonAPI();
export const GenLabPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [dragon, setDragon] = React.useState<DragonObject | null>(null);

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
      {rarity && dragon ? (
        <Wrapper>
          <DragonImage
            onError={(e) => e.currentTarget.src = EMPTY}
            src={dragon.url}
            color={rarity.color}
          />
        </Wrapper>
      ) : null}
    </Container>
  );
}

export default GenLabPage;
