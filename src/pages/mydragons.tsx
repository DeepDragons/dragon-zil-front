import React from "react";
import { NextPage, GetServerSidePropsContext } from "next";
import { useStore } from "effector-react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Navbar } from "components/nav-bar";
import { Card } from "components/card";
import { Text } from "components/text";
import { SkeletCard } from "components/skelet/card";
import { FilterBar } from "components/filter-bar";
import { Container } from "components/pages/container";
import { Wrapper } from "components/pages/wrapper";
import { ErrorModal } from "components/modals/error";
import { CardContainer } from "components/dragon/styles";
import { CardText } from "components/dragon/card-text";

import { $wallet } from "store/wallet";
import {
  $myDragons,
  contctDragons,
  resetDragons,
  updateDragons,
} from "store/my-dragons";
import { DragonAPI, QueryParams } from "lib/api";
import { useScrollEvent } from "mixin/scroll";
import { isMobile } from "react-device-detect";
import { StyleFonts } from "@/config/fonts";
import { Colors } from "@/config/colors";
import { RARITY } from "@/lib/rarity";
import { getAction } from "@/lib/get-action";
import { Button } from "@/components/button";

const backend = new DragonAPI();
const params: QueryParams = {
  limit: 9,
  offset: 0,
};
let maxPage = 1;
export var MyDragons: NextPage = function () {
  const refWrapper = React.useRef<HTMLDivElement | null>();

  const dragonsLocale = useTranslation(`dragons`);
  const commonLocale = useTranslation(`common`);

  const address = useStore($wallet);
  const dragons = useStore($myDragons);

  const [skelet, setSkelet] = React.useState(true);
  const [errorCode, setErrorCode] = React.useState<number | string | null>(
    null,
  );
  const [sortItem, setSortItem] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const items = React.useMemo(
    () => [
      commonLocale.t(`all`),
      commonLocale.t(`rarity`),
      commonLocale.t(`strong`),
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

    params.owner = String(addr.base16).toLowerCase();
    const result = await backend.getDragons(params);

    maxPage = result.pagination.pages;

    contctDragons(result.list);

    params.offset += 1;
  };

  const hanldeSort = React.useCallback(async (index: number) => {
    setSortItem(index);
    setSkelet(true);

    params.sort = undefined;
    params.owner = String($wallet.getState()?.base16).toLowerCase();
    params.stage = undefined;
    params.offset = 0;

    if (index === 3) {
      params.stage = 1;
    } else if (index === 4) {
      params.stage = 0;
    } else {
      params.sort = index;
    }

    try {
      const result = await backend.getDragons(params);

      maxPage = result.pagination.pages;

      resetDragons();
      updateDragons(result.list);
    } catch {
      //
    }
    setSkelet(false);
  }, []);

  React.useEffect(() => {
    setSkelet(true);
    resetDragons();
    maxPage = 1;
    params.offset = 0;
    params.owner = String(address?.base16).toLowerCase();
    fetchData()
      .then(() => setSkelet(false))
      .catch((err) => {
        setErrorCode(err.message);
        setSkelet(false);
      });
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
          {dragonsLocale.t(`title`)}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t(`name`)} | ${dragonsLocale.t(`title`)}`}
          key="title"
        />
      </Head>
      <Navbar />
      <FilterBar
        title={dragonsLocale.t(`title`)}
        selectedSort={sortItem}
        rarity={dragons.length !== 0}
        items={items}
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
              <Link
                key={index}
                href={`/dragon/${dragon.id}`}
                passHref
              >
                <div>
                  <Card dragon={dragon}>
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
                        {getAction(dragon.actions)}
                        {` `}
                        <span>{dragon.name ? `- ${dragon.name}` : ``}</span>
                      </CardText>
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
            {commonLocale.t(`no_dragons`)}
          </Text>
          <Link
            href="/buy"
            passHref
          >
            <Button>{commonLocale.t(`buy`)}</Button>
          </Link>
        </>
      ) : null}
      {loading ? (
        <Loader type="ThreeDots" color={Colors.White} height={30} width={100} />
      ) : null}
      {}
      <ErrorModal show={Boolean(errorCode)} code={errorCode} />
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(props.locale || `en`, [
      `common`,
      `dragons`,
    ])),
  },
});

export default MyDragons;
