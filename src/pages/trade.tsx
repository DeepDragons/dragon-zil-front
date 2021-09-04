import React from 'react';
import { useRouter } from 'next/router';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Navbar } from 'components/nav-bar';
import { SkeletCard } from '@/components/skelet/card';
import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';
import { FilterBar } from '@/components/filter-bar';
import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { Button } from 'components/button';
import Loader from 'react-loader-spinner';

import { $wallet } from 'store/wallet';
import {
  $marketDragons,
  contactMarketDragons,
  resetMarketDragons
} from 'store/market';
import { RARITY } from 'lib/rarity';
import { DragonAPI, QueryParams } from '@/lib/api';
import { getMarketOrder, getMarketPrice } from 'lib/get-action';
import { StyleFonts } from '@/config/fonts';
import { CardContainer } from 'components/dragon/styles';
import { Colors } from '@/config/colors';
import { useScrollEvent } from '@/mixin/scroll';
import { MarketPlace } from 'mixin/market-place';

const params: QueryParams = {
  limit: 9,
  offset: 0
};
let maxPage = 1;
const items = [
  'all',
  'Rarity',
  'Stronger',
  'Price',
  'Dragons',
  'Eggs'
];
const backend = new DragonAPI();
const marketPlace = new MarketPlace();
export const TradePage: NextPage = () => {
  const tradeLocale = useTranslation('trade');
  const commonLocale = useTranslation('common');
  const router = useRouter();
  const address = useStore($wallet);
  const dragons = useStore($marketDragons);

  const [sortItem, setSortItem] = React.useState(0);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= params.offset || !addr) {
      return null;
    }

		const result = await backend.getDragonsFromMarket(params);

    maxPage = result.pagination.pages;

    contactMarketDragons(result.list);

    params.offset = params.offset + 1;
	};

  const handleFiltred = React.useCallback(async(startPrice: number, endPrice: number) => {
    setSkelet(true);

    params.startPrice = startPrice;
    params.endPrice = endPrice;

    try {
      const result = await backend.getDragonsFromMarket(params);

      maxPage = result.pagination.pages;
  
      resetMarketDragons();
      contactMarketDragons(result.list);
    } catch {
      //
    }
    setSkelet(false);
  }, []);
  const hanldeSort = React.useCallback(async(index: number) => {
    setSortItem(index);
    setSkelet(true);

    params.sort = undefined;
    params.owner = undefined;
    params.stage = undefined;

    if (index === 4) {
      params.stage = 1;
    } else if (index === 5) {
      params.stage = 0;
    } else {
      params.sort = index;
    }

    try {
      const result = await backend.getDragonsFromMarket(params);

      maxPage = result.pagination.pages;
  
      resetMarketDragons();
      contactMarketDragons(result.list);
    } catch {
      //
    }
    setSkelet(false);
  }, []);

  React.useEffect(() => {
    setSkelet(true);
    resetMarketDragons();
    params.offset = 0;
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
          {commonLocale.t('name')} | {tradeLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${tradeLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={tradeLocale.t('title')}
        selectedSort={sortItem}
        items={items}
        price
        onFilter={handleFiltred}
        onSelectSort={hanldeSort}
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
                onSelect={() => router.push(`/dragon/${dragon.id}`)}
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
                    {(Number(dragon.actions[0][1]) / 10**12).toLocaleString()} $ZIL
                  </Text>
                  {dragon.owner.toLowerCase() !== String(address?.base16).toLowerCase() ? (
                    <Button
                      color={Colors.LightBlue}
                      onClick={() => marketPlace.purchase(dragon.id, getMarketPrice(dragon.actions))}
                    >
                      {commonLocale.t('buy')}
                    </Button>
                  ) : (
                    <Button
                      color={Colors.Info}
                      onClick={() => marketPlace.cancel(getMarketOrder(dragon.actions))}
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
          color={Colors.Primary}
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
      ...await serverSideTranslations(props.locale || 'en', ['common', 'trade'])
    }
  };
};

export default TradePage;
