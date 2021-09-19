import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Container } from 'components/pages/container';
import { Navbar } from 'components/nav-bar';
import { ActionBarTitle } from 'components/dragon/action-bar-title';
import { UpgradeGenModal } from 'components/modals/upgrade-gen';
import { NoCache } from 'components/no-cache';

import { DragonAPI, DragonObject } from '@/lib/api';
import { getRarity } from '@/lib/rarity';
import { $wallet } from '@/store/wallet';
import { GenLab } from 'mixin/gen-lab';

const UpgradeGens = dynamic(import('components/dragon/upgrade-gens'));
const MobileUpgradeGens = dynamic(import('components/mobile/upgrade-gens'));
const RarityImage = dynamic(import('components/rarity-image'));

type Prop = {
  dragon: DragonObject;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 30px;

  width: 100%;
  max-width: 1224px;

  @media (max-width: 947px) {
    align-items: center;
    justify-content: center;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 943px;
  align-items: self-start;
  width: 100%;
`;

const backend = new DragonAPI();
const genLab = new GenLab();
export const GenLabPage: NextPage<Prop> = (props) => {
  const mutateLocale = useTranslation('mutate');
  const commonLocale = useTranslation('common');
  const router = useRouter();
  const address = useStore($wallet);
  const [price, setPrice] = React.useState<string | null>('0');
  const [dragon, setDragon] = React.useState<DragonObject | null>(props.dragon);
  const [showModal, setShowModal] = React.useState(false);
  const [genToUpgrade, setGenToUpgrade] = React.useState({
    gen: 0,
    value: 0,
    name: ''
  });

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

  const handleUpgrade = React.useCallback((gen: number, value: number, name: string) => {
    setGenToUpgrade({
      gen,
      value,
      name
    });
    setShowModal(true);
  }, []);

  React.useEffect(() => {
    if (dragon) {
      genLab
        .getPrice(String(dragon.id))
        .then(([price]) => setPrice(price))
        .catch(console.error);
    }
  }, [dragon]);

  React.useEffect(() => {
    if (dragon && address &&  dragon.owner.toLowerCase() !== address.base16.toLowerCase()) {
      router.push(`/dragon/${dragon.id}`);
    }
  }, [dragon, address]);

  React.useEffect(() => {
    if (dragon) {
      backend
        .getDragon(String(dragon.id))
        .then((d) => {
          if (d) {
            setDragon(d);
          }
        });
    }
  }, []);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {mutateLocale.t('sub_title')} #{dragon?.id}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${mutateLocale.t('sub_title')} #${dragon?.id}`}
          key="title"
        />
        <NoCache />
      </Head>
      <Navbar />
      {dragon && rarity ? (
        <TitleWrapper>
          <ActionBarTitle
            dragon={dragon}
            isOwner={isOwner}
            color={rarity.color}
            price={`${price} ZLP`}
          />
        </TitleWrapper>
      ) : null}
      {rarity && dragon ? (
        <Wrapper>
          <RarityImage
            width={500}
            height={500}
            id={dragon.id}
            rarity={dragon.rarity}
            url={dragon.url}
          />
          <BrowserView>
            <UpgradeGens
              color={rarity.color}
              gens={dragon.gen_fight}
              onSelect={handleUpgrade}
            />
          </BrowserView>
          <MobileView>
            <MobileUpgradeGens
              color={rarity.color}
              price={price ? price : 0}
              gens={dragon.gen_fight}
              onSelect={handleUpgrade}
            />
          </MobileView>
        </Wrapper>
      ) : null}
      <UpgradeGenModal
        gen={genToUpgrade}
        show={showModal}
        id={dragon?.id || ''}
        price={price ? price : 0}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
}

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
      ...await serverSideTranslations(props.locale || 'en', ['common', 'mutate'])
    },
    revalidate: 1
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/mutate/id',
    ],
    fallback: true
  }
}

export default GenLabPage;
