import React from "react";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Navbar } from "components/nav-bar";
import { Container } from "components/pages/container";
import { Wrapper } from "components/pages/wrapper";
import { Button } from "components/button";
import { CardText } from "components/dragon/card-text";
import Loader from "react-loader-spinner";

import { $wallet } from "store/wallet";
import {
  $marketDragons,
  contactMarketDragons,
  resetMarketDragons,
} from "store/market";
import { RARITY } from "lib/rarity";
import { getMarketOrder, getMarketPrice } from "lib/get-action";
import { CardContainer } from "components/dragon/styles";
import { MarketPlace } from "mixin/market-place";
import { DragonAPI, QueryParams } from "@/lib/api";
import { StyleFonts } from "@/config/fonts";
import { Colors } from "@/config/colors";
import { useScrollEvent } from "@/mixin/scroll";
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
const marketPlace = new MarketPlace();
export var TradePage: NextPage = function () {
  const refWrapper = React.useRef<HTMLDivElement | null>();

  const tradeLocale = useTranslation(`trade`);
  const commonLocale = useTranslation(`common`);

  const router = useRouter();
  const address = useStore($wallet);
  const dragons = useStore($marketDragons);

  const [sortItem, setSortItem] = React.useState(0);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const items = React.useMemo(
    () => [
      commonLocale.t(`all`),
      commonLocale.t(`rarity`),
      commonLocale.t(`strong`),
      commonLocale.t(`price`),
      commonLocale.t(`dragons`),
      commonLocale.t(`eggs`),
    ],
    [commonLocale],
  );

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= params.offset || !addr) {
      return null;
    }

    const result = await backend.getDragonsFromMarket(params);

    maxPage = result.pagination.pages;

    contactMarketDragons(result.list);

    params.offset += 1;
  };

  const handleFiltred = React.useCallback(
    async (startPrice: number, endPrice: number) => {
      setSkelet(true);

      params.offset = 0;
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
    },
    [],
  );
  const hanldeSort = React.useCallback(async (index: number) => {
    setSortItem(index);
    setSkelet(true);

    params.sort = undefined;
    params.owner = undefined;
    params.stage = undefined;
    params.offset = 0;

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
          {tradeLocale.t(`title`)}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t(`name`)} | ${tradeLocale.t(`title`)}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={tradeLocale.t(`title`)}
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
            {dragons.map((dragon) => (
              <Card
                key={dragon.id}
                dragon={dragon}
                onSelect={() => router.push(`/dragon/${dragon.id}`)}
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
                    {(Number(dragon.actions[0][1]) / 10 ** 12).toLocaleString()}
                    {` `}
                    $ZIL
                  </Text>
                  {dragon.owner.toLowerCase()
                  !== String(address?.base16).toLowerCase() ? (
                    <Button
                      color={Colors.LightBlue}
                      onClick={() => marketPlace.purchase(
                        getMarketOrder(dragon.actions),
                        getMarketPrice(dragon.actions),
                      )}
                    >
                      {commonLocale.t(`buy`)}
                    </Button>
                    ) : (
                      <Button
                        color={Colors.Info}
                        onClick={() => marketPlace.cancel(getMarketOrder(dragon.actions))}
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
        <Loader
          type="ThreeDots"
          color={Colors.Primary}
          height={30}
          width={100}
        />
      ) : null}
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(props.locale || `en`, [
      `common`,
      `trade`,
    ])),
  },
});

export default TradePage;
