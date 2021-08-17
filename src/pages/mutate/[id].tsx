import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Container } from 'components/pages/container';
import { DragonImage } from 'components/dragon/dragon-image';
import { Navbar } from 'components/nav-bar';
import { ActionBarTitle } from 'components/dragon/action-bar-title';
import { UpgradeGens } from 'components/dragon/upgrade-gens';

import { EMPTY } from 'config/emty';
import { $dragonCache } from 'store/cache-dragon';
import { DragonAPI, DragonObject } from '@/lib/api';
import { getRarity } from '@/lib/rarity';
import { $wallet } from '@/store/wallet';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 943px;
  padding-top: 30px;

  @media (max-width: 947px) {
    align-items: center;
    justify-content: center;
  }
`;

const backend = new DragonAPI();
export const GenLabPage: NextPage = () => {
  const router = useRouter();
  const address = useStore($wallet);
  const [loading, setLoading] = React.useState(false);
  const [dragon, setDragon] = React.useState<DragonObject | null>(null);

  const rarity = React.useMemo(() => {
    if (!dragon) {
      return null;
    }
    return getRarity(dragon.rarity, dragon.gen_image);
  }, [dragon]);

  const isOwner = React.useMemo(() => {
    if (!dragon) return false; 
    return dragon.owner.toLowerCase() === address?.base16.toLowerCase();
  }, [address, dragon]);

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
      {dragon ? (
        <ActionBarTitle
          dragon={dragon}
          isOwner={isOwner}
        />
      ) : null}
      {rarity && dragon ? (
        <Wrapper>
          <DragonImage
            onError={(e) => e.currentTarget.src = EMPTY}
            src={dragon.url}
            color={rarity.color}
          />
          <UpgradeGens
            color={rarity.color}
            gens={dragon.gen_fight}
          />
        </Wrapper>
      ) : null}
    </Container>
  );
}

export default GenLabPage;
