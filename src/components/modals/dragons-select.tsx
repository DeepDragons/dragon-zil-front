import React from "react";
import styled from "styled-components";
import { useStore } from "effector-react";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { useTranslation } from "next-i18next";

import { Text } from "components/text";
import { Card } from "components/card";
import { SkeletCard } from "components/skelet/card";
import { FilterBar } from "components/filter-bar";
import { CardContainer } from "components/dragon/styles";
import { ScreenModal } from "components/screen-modal";
import { $wallet } from "store/wallet";
import { Colors } from "config/colors";
import {
  $myDragons,
  contctDragons,
  resetDragons,
  updateDragons,
} from "store/my-dragons";
import { Button } from "@/components/button";

import { StyleFonts } from "@/config/fonts";
import { DragonObject, DragonAPI, QueryParams } from "@/lib/api";
import { RARITY } from "@/lib/rarity";

type Prop = {
  show: boolean;
  onSelect: (dragon: DragonObject) => void;
  onClose: () => void;
};

const Content = styled.div`
  background: ${Colors.Black};
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;

  overflow-y: scroll;
`;

const backend = new DragonAPI();
const params: QueryParams = {
  limit: 9,
  offset: 0,
};
let maxPage = 1;
export var DragonsSelectModal: React.FC<Prop> = function ({
  show,
  onSelect,
  onClose,
}) {
  const commonLocale = useTranslation(`common`);
  const address = useStore($wallet);
  const dragons = useStore($myDragons);
  const [loading, setLoading] = React.useState(false);
  const [sortItem, setSortItem] = React.useState(0);
  const [skelet, setSkelet] = React.useState(true);

  const items = React.useMemo(
    () => [
      commonLocale.t(`all`),
      commonLocale.t(`rarity`),
      commonLocale.t(`strong`),
    ],
    [],
  );

  const fetchData = React.useCallback(async () => {
    const addr = $wallet.getState();

    if (maxPage <= params.offset || !addr) {
      return null;
    }

    params.owner = String(addr.base16).toLowerCase();
    params.stage = 1;
    const result = await backend.getDragons(params);

    maxPage = result.pagination.pages;

    contctDragons(result.list);

    params.offset += 1;
  }, [dragons]);

  const hanldeSort = React.useCallback(async (index: number) => {
    setSortItem(index);
    resetDragons();
    setSkelet(true);

    params.sort = undefined;
    params.owner = String($wallet.getState()?.base16).toLowerCase();
    params.stage = 1;
    params.offset = 0;
    params.sort = index;

    try {
      const result = await backend.getDragons(params);

      maxPage = result.pagination.pages;

      updateDragons(result.list);
    } catch {
      //
    }

    setSkelet(false);
  }, []);

  const handleScroll = React.useCallback(
    async (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!show) {
        return null;
      }

      const scrollHeight = Number(
        (event.target as HTMLDivElement).scrollHeight,
      );
      const scrollTop = Number((event.target as HTMLDivElement).scrollTop);
      const scroll = Math.ceil(window.innerHeight + scrollTop) - 100;

      if (scroll >= scrollHeight) {
        setLoading(true);

        try {
          await fetchData();
        } catch (err) {
          console.error(err);
        }

        setLoading(false);
      }
    },
    [show],
  );

  const hanldeOnSelect = React.useCallback((dragon: DragonObject) => {
    onClose();
    onSelect(dragon);
  }, []);

  React.useEffect(() => {
    if (address && show) {
      resetDragons();
      setSkelet(true);
      maxPage = 1;
      params.offset = 0;
      fetchData()
        .then(() => setSkelet(false))
        .catch(() => {
          setSkelet(false);
        });
    }
  }, [address, show]);

  return (
    <ScreenModal onClose={onClose} show={show}>
      <Content className="modal-content">
        <FilterBar
          title={commonLocale.t(`select`)}
          selectedSort={sortItem}
          rarity={dragons.length !== 0}
          items={items}
          onSelectSort={hanldeSort}
        />
        <Wrapper onScrollCapture={handleScroll}>
          {dragons.length === 0 && skelet ? (
            <>
              <SkeletCard />
              <SkeletCard />
              <SkeletCard />
              <SkeletCard />
            </>
          ) : (
            <>
              {dragons.map((dragon, index) => (
                <div key={index} onClick={() => hanldeOnSelect(dragon)}>
                  <Card dragon={dragon}>
                    <CardContainer onClick={() => onSelect(dragon)}>
                      <Text
                        fontVariant={StyleFonts.FiraSansSemiBold}
                        fontColors={RARITY[dragon.rarity].color}
                        size="16px"
                      >
                        #
                        {dragon.id}
                        ,
                        {` `}
                        {RARITY[dragon.rarity].name}
                      </Text>
                    </CardContainer>
                  </Card>
                </div>
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
            <Link href="/buy">
              <Button>{commonLocale.t(`buy`)}</Button>
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
      </Content>
    </ScreenModal>
  );
};
