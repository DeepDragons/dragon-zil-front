import React from 'react';
import { useRouter } from 'next/router';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { Navbar } from 'components/nav-bar';
import { SkeletCard } from '@/components/skelet/card';
import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';
import { FilterBar } from '@/components/filter-bar';
import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { CardText } from 'components/dragon/card-text';
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
import { useScrollEvent } from '@/mixin/scroll';
import { Button } from '@/components/button';
import { FigthPlace } from 'mixin/fight-place';
import { isMobile } from 'react-device-detect';

const limit = 9;
let page = 0;
let maxPage = 1;
const backend = new DragonAPI();
const figthPlace = new FigthPlace();
export const FightPage: NextPage = () => {
  const refWrapper = React.useRef<HTMLDivElement | null>();

  const fightsLocale = useTranslation('fights');
  const commonLocale = useTranslation('common');

  const router = useRouter();
  const address = useStore($wallet);
  const dragons = useStore($marketDragons);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleSelect = React.useCallback((dragon) => {
    router.push(`/fights/${dragon.id}`);
  }, []);
  const handleCancel = React.useCallback(async(dragon) => {
    await figthPlace.place(dragon.id, 0, true);
  }, []);

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= page || !addr) {
      return null;
    }

		const result = await backend.getDragonsFromFight(limit, page);

    maxPage = result.pagination.pages;

    contactMarketDragons(result.list);

    page += 1;
	};

  React.useEffect(() => {
    setSkelet(true);
    resetMarketDragons();
    page = 0;
    fetchData()
      .then(() => setSkelet(false))
      .catch(() => setSkelet(false));
  }, [address]);

  useScrollEvent(async () => {
    const h = isMobile ? window.innerHeight / 2 : 0;
    const first = Math.ceil(window.innerHeight + document.documentElement.scrollTop) + h;
    const second = refWrapper.current?.scrollHeight || document.documentElement.offsetHeight;

    if (first < second || loading || skelet) {
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
          {commonLocale.t('name')} | {fightsLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${fightsLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar title={fightsLocale.t('title')} />
      <Wrapper ref={(n) => refWrapper.current = n}>
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
                  <CardText
                    fontVariant={StyleFonts.FiraSansSemiBold}
                    fontColors={RARITY[dragon.rarity].color}
                    size="16px"
                  >
                    #{dragon.id} <span>
                      {dragon.name ? `- ${dragon.name}` : ''}
                    </span>
                  </CardText>
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
                      {commonLocale.t('start_fight')}
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
      {!loading && !skelet && dragons.length === 0 ? (
        <>
          <Text
            fontVariant={StyleFonts.FiraSansRegular}
            css="text-align: center;max-width: 400px;"
          >
            {fightsLocale.t('no_dragons')}
          </Text>
          <Link href="/mydragons">
            <Button>
              {fightsLocale.t('place')}
            </Button>
          </Link>
        </>
      ) : null}
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
      ...await serverSideTranslations(props.locale || 'en', ['common', 'fights'])
    }
  };
};

export default FightPage;
