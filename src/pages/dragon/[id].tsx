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
import { NameModal } from 'components/modals/name';
import { NoCache } from 'components/no-cache';

import { DragonAPI, DragonObject } from 'lib/api';
import { getRarity } from 'lib/rarity';
import { updateCache } from 'store/cache-dragon';
import { BreedPlace } from 'mixin/breed';
import { MarketPlace } from 'mixin/market-place';
import { StyleFonts } from '@/config/fonts';
import { getMarketOrder, getMarketPrice } from 'lib/get-action';
import { ZIlPayToken } from '@/mixin/zilpay-token';
import { NameDragons } from '@/mixin/name';
import { genParse } from '@/lib/gen-parse';

const RarityImage = dynamic(import('components/rarity-image'));
const CombatGens = dynamic(import('components/dragon/combat-gens'));
const BodyParts = dynamic(import('components/dragon/body-parts'));
const ActionBar = dynamic(import('components/dragon/action-bar'));

type prop = {
  dragon: DragonObject | null;
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
const dragonsName = new NameDragons();

export const Dragon: NextPage<prop> = (props) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const router = useRouter();

  const [transfer, setTransfer] = React.useState(false);
  const [sale, setSale] = React.useState(false);
  const [arena, setArena] = React.useState(false);
  const [breed, setBreed] = React.useState(false);
  const [suicide, setSuicide] = React.useState(false);
  const [hatchEgg, setHatchEgg] = React.useState(false);
  const [nameModal, setNameModal] = React.useState(false);
  const [dragon, setDragon] = React.useState<DragonObject | null>(props.dragon);

  const currentAction = React.useMemo(() => {
    if (dragon && dragon.actions && dragon.actions[0] && dragon.actions[0][0]) {
      return Number(dragon.actions[0][0]);
    }

    return 0;
  }, [dragon]);
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
  const faceGenesCounter = React.useMemo(() => {
    let counter = 0;

    if (rarity && rarity.gensImage) {
      for (let index = 0; index < rarity.gensImage.length; index++) {
        const element = rarity.gensImage[index];

        counter += Number(element.value);
      }
    }

    return counter;
  }, [rarity]);
  const genes = React.useMemo(() => {
    if (dragon) {
      return genParse(dragon?.gen_fight);
    }

    return [];
  }, [dragon]);
  const price = React.useMemo(() => {
    const p = Number(getMarketPrice(dragon?.actions));

    if (!p) {
      return undefined;
    }

    if (currentAction === 3) {
      return `${p / 10**12} $ZIL`;
    }

    if (currentAction === 2 || currentAction === 1) {
      return `${p / Number(ZIlPayToken.decimal)} $ZLP`;
    }

    return undefined;
  }, [dragon]);
  const descriptionOpenGraph = React.useMemo(() => {
    if (currentAction === 3) {
      return `Rarity ${rarity?.name}, ${commonLocale.t('buy')} for ${price}`;
    }

    return `Rarity ${rarity?.name}`;
  }, [currentAction, price]);

  const hanldeMutate = React.useCallback(() => {
    if (dragon) {
      updateCache(dragon);
      router.push(`/mutate/${dragon.id}`);
    }
  }, [dragon]);

  React.useEffect(() => {
    backend
    .getDragon(String(router.query.id))
    .then((d) => {
      if (d) {
        setDragon(d);
      }

      return dragonsName.getName(String(router.query.id));
    })
    .then((name) => {
      if (name && dragon) {
        setDragon({
          ...dragon,
          name
        });
      }
    })
    .catch(console.error);
  }, [router]);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {stageType} #{dragon?.id}
        </title>
        <OpenGraph
          url={`https://dragonzil.xyz/dragon/${dragon?.id}`}
          title={`${commonLocale.t('name')} | ${stageType} #${dragon?.id}`}
          description={descriptionOpenGraph}
          img={dragon?.url}
          alt={`Dragon ID #${dragon?.id}`}
          site="@dragons_eth"
          siteName="dragonZIL"
        />
        <NoCache />
      </Head>
      <Navbar />
      {dragon && rarity ? (
        <ActionBar
          dragon={dragon}
          color={rarity.color}
          price={price}
          currentAction={currentAction}
          transfer={() => setTransfer(true)}
          hatchEgg={() => setHatchEgg(true)}
          sale={() => setSale(true)}
          RemoveBreed={() => breedPlace.cancelBreed(String(router.query.id))}
          RemoveSale={() => marketPlace.cancel(getMarketOrder(dragon?.actions))}
          buy={() => marketPlace.purchase(getMarketOrder(dragon?.actions), getMarketPrice(dragon?.actions))}
          mutate={hanldeMutate}
          fight={() => setArena(true)}
          breed={() => setBreed(true)}
          suicide={() => setSuicide(true)}
          onChangeName={() => setNameModal(true)}
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
              gens={genes}
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
      <NameModal
        show={nameModal}
        dragon={dragon}
        onClose={() => setNameModal(false)}
      />
      <FightsModal
        show={arena}
        id={dragon?.id || ''}
        onClose={() => setArena(false)}
      />
      <BreedModal
        show={breed}
        id={dragon?.id || ''}
        combatGenes={genes}
        faceCounter={faceGenesCounter}
        onClose={() => setBreed(false)}
      />
      <SuicideModal
        show={suicide}
        dragon={dragon}
        id={dragon?.id || ''}
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
  if (props.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    props.res.setHeader('Cache-Control', 'no-store');
  }

  const dragonId = String(props.params && props.params.id);
  const dragon = await backend.getDragon(String(dragonId));

  return {
    props: {
      dragon,
      ...await serverSideTranslations(props.locale || 'en', ['common', 'dragon'])
    },
    revalidate: 1
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/dragon/id',
    ],
    fallback: true
  }
}

export default Dragon;
