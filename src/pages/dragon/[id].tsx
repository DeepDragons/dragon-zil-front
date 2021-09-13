import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { Container } from 'components/pages/container';
import { TransferModal } from 'components/modals/transfer';
import { OpenGraph } from 'components/open-graph';
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

const RarityImage = dynamic(import('components/rarity-image'));
const CombatGens = dynamic(import('components/dragon/combat-gens'));
const BodyParts = dynamic(import('components/dragon/body-parts'));
const ActionBar = dynamic(import('components/dragon/action-bar'));

type prop = {
  dragon: DragonObject;
}

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
export const Dragon: NextPage<prop> = ({ dragon }) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const router = useRouter();

  const [transfer, setTransfer] = React.useState(false);
  const [sale, setSale] = React.useState(false);
  const [arena, setArena] = React.useState(false);
  const [breed, setBreed] = React.useState(false);
  const [suicide, setSuicide] = React.useState(false);
  const [hatchEgg, setHatchEgg] = React.useState(false);

  const stageType = React.useMemo(() => {
    if (!dragon) {
      return dragonLocale.t('dragon');
    }

    return dragon?.stage === 0 ? dragonLocale.t('egg') : dragonLocale.t('dragon');
  }, [dragon]);
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
    if (dragon) {
      backend
        .getDragon(String(dragon.id))
        .then((d) => {
          if (d) {
            dragon = d;
          }
        });
    }
  }, []);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {stageType} #{dragon?.id}
        </title>
        <OpenGraph
          url={`https://dragonzil.xyz/dragon/${dragon?.id}`}
          title={`${commonLocale.t('name')} | ${stageType} #${dragon?.id}`}
          description={`Rarity ${rarity?.name}`}
          img={dragon?.url}
          alt={`Dragon ID #${dragon?.id}`}
          site="@dragons_eth"
          siteName="dragonZIL"
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
            {/* <BattlesSection
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
            ) : null} */}
          </div>
        </Wrapper>
      ) : null}
      {!dragon ? (
        <Wrapper>
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            size="50px"
          >
            {dragonLocale.t('not_found')} #{router.query.id}
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
        id={dragon?.id}
        stage={dragon?.stage || 0}
        onClose={() => setSuicide(false)}
      />
      {dragon?.stage == 0 ? (
        <HatchEggModal
          show={hatchEgg}
          id={dragon.id}
          onClose={() => setHatchEgg(false)}
        />
      ) : null}
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  const dragonId = String(props.params && props.params.id);
  const dragon = await backend.getDragon(String(dragonId));

  return {
    props: {
      dragon,
      ...await serverSideTranslations(props.locale || 'en', ['common', 'dragon'])
    }
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/dragon/id',
    ],
    fallback: 'blocking'
  }
}

export default Dragon;
