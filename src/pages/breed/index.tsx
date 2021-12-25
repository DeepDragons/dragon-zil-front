import React from "react";
import { useRouter } from "next/router";
import { useStore } from "effector-react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPage, GetServerSidePropsContext } from "next";

import { Navbar } from "components/nav-bar";
import { Container } from "components/pages/container";
import { Wrapper } from "components/pages/wrapper";
import Loader from "react-loader-spinner";
import { CardContainer } from "components/dragon/styles";
import { CardText } from "components/dragon/card-text";

import { $wallet } from "store/wallet";
import {
  $BreedDragons,
  contactBreedDragons,
  resetBreedDragons,
} from "store/breed";
import { RARITY } from "lib/rarity";
import { updateCache } from "store/cache-dragon";
import { useScrollEvent } from "mixin/scroll";
import { BreedPlace } from "mixin/breed";
import { isMobile } from "react-device-detect";
import { DragonAPI, QueryParams } from "@/lib/api";
import { StyleFonts } from "@/config/fonts";
import { Colors } from "@/config/colors";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Card } from "@/components/card";
import { FilterBar } from "@/components/filter-bar";
import { SkeletCard } from "@/components/skelet/card";

const params: QueryParams = {
  limit: 9,
  offset: 0,
};
let maxPage = 1;
const backend = new DragonAPI();
const breedPlace = new BreedPlace();
export var BreedPage: NextPage = function () {
  const refWrapper = React.useRef<HTMLDivElement | null>();

  const breedLocale = useTranslation(`breed`);
  const commonLocale = useTranslation(`common`);

  const router = useRouter();
  const address = useStore($wallet);
  const dragons = useStore($BreedDragons);
  const [sortItem, setSortItem] = React.useState(0);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const items = React.useMemo(
    () => [
      commonLocale.t(`all`),
      commonLocale.t(`rarity`),
      commonLocale.t(`strong`),
      commonLocale.t(`price`),
    ],
    [],
  );

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= params.offset || !addr) {
      return null;
    }

    const result = await backend.getDragonsFromBreed(params);

    maxPage = result.pagination.pages;

    contactBreedDragons(result.list);

    params.offset += 1;
  };

  const handleFiltred = React.useCallback(
    async (startPrice: number, endPrice: number) => {
      setSkelet(true);

      params.startPrice = startPrice;
      params.endPrice = endPrice;
      params.offset = 0;

      try {
        const result = await backend.getDragonsFromBreed(params);

        maxPage = result.pagination.pages;

        resetBreedDragons();
        contactBreedDragons(result.list);
      } catch {
        //
      }
      setSkelet(false);
    },
    [],
  );
  const hanldeSort = React.useCallback(async (index: number) => {
    setSortItem(index);
    setSkelet(true);

    params.sort = index;
    params.offset = 0;

    try {
      const result = await backend.getDragonsFromBreed(params);

      maxPage = result.pagination.pages;

      resetBreedDragons();
      contactBreedDragons(result.list);
    } catch {
      //
    }
    setSkelet(false);
  }, []);

  const handleSelect = React.useCallback((dragon) => {
    updateCache(dragon);
    router.push(`/breed/${dragon.id}`);
  }, []);
  const handleCancel = React.useCallback(async (dragon) => {
    try {
      await breedPlace.cancelBreed(dragon.id);
    } catch {
      ///
    }
  }, []);

  React.useEffect(() => {
    setSkelet(true);
    resetBreedDragons();
    params.offset = 0;
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
          {commonLocale.t(`name`)}
          {` `}
          |
          {breedLocale.t(`title`)}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t(`name`)} | ${breedLocale.t(`title`)}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={breedLocale.t(`title`)}
        selectedSort={sortItem}
        items={items}
        price
        onFilter={handleFiltred}
        onSelectSort={hanldeSort}
      />
      <Wrapper ref={(n) => (refWrapper.current = n)}>
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
                    #
                    {dragon.id}
                    ,
                    {` `}
                    {RARITY[dragon.rarity].name}
                    {` `}
                    <span>{dragon.name ? `- ${dragon.name}` : ``}</span>
                  </CardText>
                  <Text
                    fontVariant={StyleFonts.FiraSansSemiBold}
                    fontColors={Colors.Blue}
                    size="18px"
                  >
                    {(Number(dragon.actions[0][1]) / 10 ** 18).toLocaleString()}
                    {` `}
                    $ZLP
                  </Text>
                  {dragon.owner.toLowerCase()
                  !== String(address?.base16).toLowerCase() ? (
                    <Button
                      color={Colors.Dark}
                      onClick={() => handleSelect(dragon)}
                    >
                      {breedLocale.t(`start_btn`)}
                    </Button>
                    ) : (
                      <Button
                        color={Colors.Primary}
                        onClick={() => handleCancel(dragon)}
                      >
                        {commonLocale.t(`get_back`)}
                      </Button>
                    )}
                </CardContainer>
              </Card>
            ))}
          </>
        )}
      </Wrapper>
      {loading ? (
        <Loader type="ThreeDots" color={Colors.Info} height={30} width={100} />
      ) : null}
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(props.locale || `en`, [
      `common`,
      `breed`,
    ])),
  },
});

export default BreedPage;
