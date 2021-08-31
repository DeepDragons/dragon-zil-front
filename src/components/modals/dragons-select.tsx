import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import Loader from "react-loader-spinner";

import { Text } from 'components/text';
import { Card } from 'components/card';
import { SkeletCard } from 'components/skelet/card';
import { FilterBar } from 'components/filter-bar';
import { CardContainer } from 'components/dragon/styles';
import { ScreenModal } from 'components/screen-modal';

import { $wallet } from 'store/wallet';
import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject, DragonAPI } from '@/lib/api';
import { $myDragons, contctDragons } from 'store/my-dragons';
import { RARITY } from '@/lib/rarity';

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
const limit = 20;
let page = 0;
let maxPage = 1;
let records: number | null = null;
export const DragonsSelectModal: React.FC<Prop> = ({
  show,
  onSelect,
  onClose
}) => {
  const address = useStore($wallet);
  const dragons = useStore($myDragons);
  const [loading, setLoading] = React.useState(false);
  const [skelet, setSkelet] = React.useState(true);
  const [onlyDragons, setOnlyDragons] = React.useState<DragonObject[]>($myDragons.getState());

  const fetchData = React.useCallback(async () => {
    const addr = $wallet.getState();

    if (maxPage <= page || !addr) {
      return null;
    } else if (!records && records === dragons.length) {
      return null;
    }

    const owner = String(addr.base16).toLowerCase();
    const result = await backend.getDragons(owner, limit, page);

    maxPage = result.pagination.pages;
    records = result.pagination.records;

    contctDragons(result.list);

    setOnlyDragons(dragons.filter(
      (dragon) => dragon.stage > 0 && dragon.actions.length === 0
    ));

    page += 1;
  }, [dragons]);

  const handleScroll = React.useCallback(async(event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!show) {
      return null;
    }

    const scrollHeight = Number((event.target as HTMLDivElement).scrollHeight);
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
  }, [show]);

  const hanldeOnSelect = React.useCallback((dragon: DragonObject) => {
    onClose();
    onSelect(dragon);
  }, []);

  React.useEffect(() => {
    if (dragons.length === 0 && show) {
      setSkelet(true);
      page = 0;
      fetchData()
        .then(() => setSkelet(false))
        .catch(() => {
          setSkelet(false);
        });
    }
  }, [address, show]);

  return (
    <ScreenModal
      onClose={onClose}
      show={show}
    >
      <Content className="modal-content">
        <FilterBar
          title="Select a dragon"
          rarity
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
              {onlyDragons.map((dragon, index) => (
                <div
                  key={index}
                  onClick={() => hanldeOnSelect(dragon)}
                >
                  <Card dragon={dragon}>
                    <CardContainer onClick={() => onSelect(dragon)}>
                      <Text
                        fontVariant={StyleFonts.FiraSansSemiBold}
                        fontColors={RARITY[dragon.rarity].color}
                        size="16px"
                      >
                        #{dragon.id}, {RARITY[dragon.rarity].name}
                      </Text>
                    </CardContainer>
                  </Card>
                </div>
              ))}
            </>
          )}
        </Wrapper>
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
