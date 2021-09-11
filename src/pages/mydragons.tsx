import React from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useStore } from 'effector-react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Loader from "react-loader-spinner";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Navbar } from 'components/nav-bar';
import { Card } from 'components/card';
import { Text } from 'components/text';
import { SkeletCard } from 'components/skelet/card';
import { FilterBar } from 'components/filter-bar';
import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';
import { ErrorModal } from 'components/modals/error';

import { $wallet } from 'store/wallet';
import { CardContainer } from 'components/dragon/styles';
import { $myDragons, contctDragons, resetDragons } from 'store/my-dragons';
import { DragonAPI } from 'lib/api';
import { Button } from '@/components/button';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { RARITY } from '@/lib/rarity';
import { getAction } from '@/lib/get-action';
import { useScrollEvent } from 'mixin/scroll';

const backend = new DragonAPI();
const limit = 9;
let page = 0;
let maxPage = 1;
export const MyDragons: NextPage = () => {
  const dragonsLocale = useTranslation('dragons');
  const commonLocale = useTranslation('common');
  const address = useStore($wallet);
  const dragons = useStore($myDragons);
  const [skelet, setSkelet] = React.useState(true);
  const [errorCode, setErrorCode] = React.useState<number | string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= page || !addr) {
      return null;
    }

    const owner = String(addr.base16).toLowerCase();
		const result = await backend.getDragons(owner, limit, page);

    maxPage = result.pagination.pages;

    contctDragons(result.list);

    page += 1;
	};

  React.useEffect(() => {
    setSkelet(true);
    resetDragons();
    page = 0;
    fetchData()
      .then(() => setSkelet(false))
      .catch((err) => {
        setErrorCode(err.message);
        setSkelet(false);
      });
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
          {commonLocale.t('name')} | {dragonsLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${dragonsLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={dragonsLocale.t('title')}
        rarity={dragons.length !== 0}
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
              <Link
                key={index}
                href={`/dragon/${dragon.id}`}
              >
                <div>
                  <Card dragon={dragon}>
                    <CardContainer>
                      <Text
                        fontVariant={StyleFonts.FiraSansSemiBold}
                        fontColors={RARITY[dragon.rarity].color}
                        size="16px"
                      >
                        #{dragon.id}, {RARITY[dragon.rarity].name} {getAction(dragon.actions)}
                      </Text>
                    </CardContainer>
                  </Card>
                </div>
              </Link>
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
            {commonLocale.t('no_dragons')}
          </Text>
          <Link href="/buy">
            <Button>
              {commonLocale.t('buy')}
            </Button>
          </Link>
        </>
      ) : null}
      {loading ? (
        <Loader
          type="ThreeDots"
          color={Colors.White}
          height={30}
          width={100}
        />
      ) : null}
      <ErrorModal
        show={Boolean(errorCode)}
        code={errorCode}
      />
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'dragons']),
    }
  };
};

export default MyDragons;
