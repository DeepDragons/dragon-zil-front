import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage, GetServerSidePropsContext } from 'next';

import { Navbar } from 'components/nav-bar';
import { SkeletCard } from '@/components/skelet/card';
import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';
import { FilterBar } from '@/components/filter-bar';
import { Card } from '@/components/card';
import { Text } from '@/components/text';
import Loader from 'react-loader-spinner';
import { CardContainer } from 'components/dragon/styles';

import { $wallet } from 'store/wallet';
import {
  $marketDragons,
  contactMarketDragons,
  resetMarketDragons
} from 'store/market';
import { RARITY } from 'lib/rarity';
import { DragonAPI } from '@/lib/api';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { updateCache } from 'store/cache-dragon';
import { useScrollEvent } from 'mixin/scroll';
import { BreedPlace } from 'mixin/breed';
import { Button } from '@/components/button';

const limit = 9;
let page = 0;
let maxPage = 1;
const backend = new DragonAPI();
const breedPlace = new BreedPlace();
export const BreedPage: NextPage = () => {
  const breedLocale = useTranslation('breed');
  const commonLocale = useTranslation('common');
  const router = useRouter();
  const address = useStore($wallet);
  const dragons = useStore($marketDragons);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= page || !addr) {
      return null;
    }

		const result = await backend.getDragonsFromBreed(limit, page);

    maxPage = result.pagination.pages;

    contactMarketDragons(result.list);

    page += 1;
	};

  const handleSelect = React.useCallback((dragon) => {
    updateCache(dragon);
    router.push(`/breed/${dragon.id}`);
  }, []);
  const handleCancel = React.useCallback(async(dragon) => {
    await breedPlace.cancelBreed(dragon.id);
  }, []);

  React.useEffect(() => {
    setSkelet(true);
    resetMarketDragons();
    page = 0;
    fetchData()
      .then(() => setSkelet(false))
      .catch(() => setSkelet(false));
  }, [address]);

  useScrollEvent(async () => {
    const first = Math.ceil(window.innerHeight + document.documentElement.scrollTop);
    const second = document.documentElement.offsetHeight;

    if (first !== second || loading) {
      return null;
    }

		setLoading(true);

    try {
      await fetchData();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  });

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {breedLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${breedLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={breedLocale.t('title')}
        price
        rarity
      />
      <Wrapper>
        {skelet ? (
          <>
          <SkeletCard />
          <SkeletCard />
          <SkeletCard />
          <SkeletCard />
          </>
        ) : (
          <>
            {dragons.map((dragon, index) => (
              <Card
                key={index}
                dragon={dragon}
                onSelect={() => handleSelect(dragon)}
              >
                <CardContainer>
                  <Text
                    fontVariant={StyleFonts.FiraSansSemiBold}
                    fontColors={RARITY[dragon.rarity].color}
                    size="16px"
                  >
                    #{dragon.id}, {RARITY[dragon.rarity].name}
                  </Text>
                  <Text
                    fontVariant={StyleFonts.FiraSansSemiBold}
                    fontColors={Colors.Blue}
                    size="18px"
                  >
                    {(Number(dragon.actions[0][1]) / 10**18).toLocaleString()} $ZLP
                  </Text>
                  {dragon.owner.toLowerCase() !== String(address?.base16).toLowerCase() ? (
                    <Button
                      color={Colors.Dark}
                      onClick={() => handleSelect(dragon)}
                    >
                      {breedLocale.t('start_btn')}
                    </Button>
                  ) : (
                    <Button
                      color={Colors.Primary}
                      onClick={() => handleCancel(dragon)}
                    >
                      {commonLocale.t('get_back')}
                    </Button>
                  )}
                </CardContainer>
              </Card>
            ))}
          </>
        )}
      </Wrapper>
      {loading ? (
        <Loader
          type="ThreeDots"
          color={Colors.Info}
          height={30}
          width={100}
        />
      ) : null}
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'breed'])
    }
  };
};

export default BreedPage;
