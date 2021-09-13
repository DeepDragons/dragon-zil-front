import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Loader from "react-loader-spinner";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { OpenGraph } from 'components/open-graph';
import { BreadGensForm } from 'components/dragon/breed-gens';

import { DragonAPI, DragonObject } from 'lib/api';
import { BreedPlace } from 'mixin/breed';
import { getRarity } from 'lib/rarity';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { Wrapper, PageTitle } from 'components/dragon/styles';
import { getPrice } from '@/lib/get-price';

const CompareCombatGens = dynamic(import('components/dragon/compare-combat-gens'));
const ChoiceWith = dynamic(import('components/dragon/choice-with'));

type Prop = {
  lover: DragonObject;
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const backend = new DragonAPI();
const breedPlace = new BreedPlace();
export const BreedStart: NextPage<Prop> = ({ lover }) => {
  const breedingLocale = useTranslation('breeding');
  const commonLocale = useTranslation('common');
  const [myDragon, setMyDragon] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleStartBreed = React.useCallback(async() => {
    if (!lover || !myDragon) {
      return null;
    }
    setLoading(true);
    try {
      await breedPlace.startBreeding(lover.id, myDragon.id);
    } catch {
      //
    }
    setLoading(false);
  }, [lover, myDragon]);

  const rarityLover = React.useMemo(() => {
    if (!lover) {
      return null;
    }
    return getRarity(lover.rarity, lover.gen_image);
  }, [lover]);
  const rarityMyDragon = React.useMemo(() => {
    if (!myDragon) {
      return null;
    }
    return getRarity(myDragon.rarity, myDragon.gen_image);
  }, [myDragon]);
  const amount = React.useMemo(() => {
    return getPrice(lover?.actions);
  }, [lover]);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {breedingLocale.t('title')} #{lover?.id} for {Number(amount) / 10**18} $ZLP
        </title>
        <OpenGraph
          url={`https://stg.dragonzil.xyz/breed/${lover?.id}`}
          title={`${breedingLocale.t('title')} #${lover?.id} for ${Number(amount) / 10**18} $ZLP`}
          description={`start breeding with a dragon ${lover?.id}`}
          img={lover?.url}
          alt={`Dragon ID #${lover?.id}`}
          site="@dragons_eth"
          siteName="dragonZIL"
        />
      </Head>
      <Navbar />
      <Wrapper>
        <PageTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="56px"
        >
          {breedingLocale.t('title')} #{lover?.id}
        </PageTitle>
        <PageTitle
          fontVariant={StyleFonts.FiraSansMedium}
          size="21px"
        >
          {commonLocale.t('price')} <span>{Number(amount) / 10**18} $ZLP</span>
        </PageTitle>
      </Wrapper>
      {lover && rarityLover ? (
        <Wrapper>
          <ChoiceWith
            dragon={lover}
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
            ) : breedingLocale.t('start_btn')}
          </ChoiceWith>
          {myDragon && rarityMyDragon && rarityLover ? (
            <Column>
              <CompareCombatGens
                loverDragon={lover}
                myDragon={myDragon}
                color={Colors.Muted}
              />
              <BreadGensForm
                loverId={lover.id}
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

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  const dragonId = String(props.params && props.params.id);
  const lover = await backend.getDragon(String(dragonId));

  return {
    props: {
      lover,
      ...await serverSideTranslations(props.locale || 'en', ['common', 'breeding'])
    }
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/breed/id',
    ],
    fallback: true
  }
}

export default BreedStart;
