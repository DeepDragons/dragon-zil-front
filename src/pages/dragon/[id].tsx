import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { RarityImage } from 'components/rarity-image';
import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { ActionBar } from 'components/dragon/action-bar';
import { CombatGens } from 'components/dragon/combat-gens';
import { BodyParts } from 'components/dragon/body-parts';
import { BattlesSection } from 'components/dragon/battles';
import { ParentsSection } from 'components/dragon/parents';
import { Container } from 'components/pages/container';
import { TransferModal } from 'components/modals/transfer';
import { SaleModal } from 'components/modals/sale';
import { FightsModal } from 'components/modals/fight';
import { BreedModal } from 'components/modals/breed';
import { SuicideModal } from 'components/modals/suicide';
import { HatchEggModal } from 'components/modals/hatch-egg';

import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { updateCache } from 'store/cache-dragon';
import { BreedPlace } from 'mixin/breed';
import { MarketPlace } from 'mixin/market-place';
import { StyleFonts } from '@/config/fonts';
import { getMarketOrder, getMarketPrice } from 'lib/get-action';

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
const breedPlace = new BreedPlace();
const marketPlace = new MarketPlace();
export const Dragon: NextPage = () => {
  const router = useRouter();

  const [dragon, setDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [transfer, setTransfer] = React.useState(false);
  const [sale, setSale] = React.useState(false);
  const [arena, setArena] = React.useState(false);
  const [breed, setBreed] = React.useState(false);
  const [suicide, setSuicide] = React.useState(false);
  const [hatchEgg, setHatchEgg] = React.useState(false);

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
      <Head>
        <title>
          {dragon?.stage === 0 ? 'Egg' : 'Dragon'} #{dragon?.id}
        </title>
        <meta
          property="og:title"
          content={`${dragon?.stage === 0 ? 'Egg' : 'Dragon'} #${dragon?.id}`}
          key="title"
        />
      </Head>
      <Navbar />
      {dragon && rarity ? (
        <ActionBar
          dragon={dragon}
          color={rarity.color}
          transfer={() => setTransfer(true)}
          hatchEgg={() => setHatchEgg(true)}
          sale={() => setSale(true)}
          RemoveBreed={() => breedPlace.cancelBreed(String(router.query.id))}
          RemoveSale={() => marketPlace.cancel(getMarketOrder(dragon.actions))}
          buy={() => marketPlace.purchase(dragon.id, getMarketPrice(dragon.actions))}
          mutate={hanldeMutate}
          fight={() => setArena(true)}
          breed={() => setBreed(true)}
          suicide={() => setSuicide(true)}
        />
      ) : null}
      {dragon && rarity ? (
        <Wrapper>
          <RarityImage
            width={500}
            height={500}
            id={dragon.id}
            rarity={dragon.rarity}
            url={dragon.url}
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
      {!dragon && !loading ? (
        <Wrapper>
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            size="50px"
          >
            Not found a dragon #{router.query.id}
          </Text>
        </Wrapper>
      ) : null}
      <TransferModal
        show={transfer}
        id={dragon?.id || ''}
        stage={dragon?.stage || 0}
        onClose={() => setTransfer(false)}
      />
      <SaleModal
        show={sale}
        id={dragon?.id || ''}
        stage={dragon?.stage || 0}
        onClose={() => setSale(false)}
      />
      <FightsModal
        show={arena}
        id={dragon?.id || ''}
        onClose={() => setArena(false)}
      />
      <BreedModal
        show={breed}
        id={dragon?.id || ''}
        onClose={() => setBreed(false)}
      />
      <SuicideModal
        show={suicide}
        id={dragon?.id || ''}
        stage={dragon?.stage || 0}
        onClose={() => setSuicide(false)}
      />
      {dragon?.stage == 0 ? (
        <HatchEggModal
          show={hatchEgg}
          id={dragon?.id || ''}
          onClose={() => setHatchEgg(false)}
        />
      ) : null}
    </Container>
  );
};

export default Dragon;
