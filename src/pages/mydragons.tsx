import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useStore } from 'effector-react';
import Link from 'next/link';
import Loader from "react-loader-spinner";

import { Navbar } from 'components/nav-bar';
import { Card } from 'components/card';
import { Text } from 'components/text';
import { SkeletCard } from 'components/skelet/card';
import { FilterBar } from 'components/filter-bar';
import { Container } from 'components/pages/container';
import { Wrapper } from 'components/pages/wrapper';

import { $wallet } from 'store/wallet';
import { $myDragons, contctDragons, resetDragons } from 'store/my-dragons';
import { DragonAPI } from 'lib/api';
import { Button } from '@/components/button';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { RARITY } from '@/lib/rarity';
import { ACTINO } from 'config/action';

const CardContainer = styled.div`
  width: 100%;
  text-align: left;
`;

const backend = new DragonAPI();
const limit = 9;
let page = 0;
let maxPage = 1;
export const MyDragons: NextPage = () => {
  const address = useStore($wallet);
  const dragons = useStore($myDragons);
  const [skelet, setSkelet] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    const addr = $wallet.getState();

    if (maxPage <= page || !addr) {
      return null;
    }

    const owner = String(addr.base16).toLowerCase();
		const result = await backend.getDragons(owner, limit, page);

    maxPage = result.pagination.pages;

    contctDragons(result.list.map((el) => ({
      action: el.actions.length > 0 ? Number(el.actions[0][0]) : 0,
      rarity: el.rarity,
      url: el.url,
      id: String(el.id),
      stage: el.stage
    })));

    page += 1;
	};

  const handleScroll = async () => {
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
  }

  React.useEffect(() => {
    setSkelet(true);
    resetDragons();
    page = 0;
    fetchData()
      .then(() => setSkelet(false))
      .catch(() => setSkelet(false));
  }, [address]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => null);
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <FilterBar
        title="My dragons"
        rarity={dragons.length !== 0}
      />
      {!skelet && dragons.length === 0 ? (
        <>
          <Text
            fontVariant={StyleFonts.FiraSansRegular}
            css="text-align: center;max-width: 400px;"
          >
            You have no dragons, you can buy it on market-palce or buy eggs.
          </Text>
          <Link href="/buy">
            <Button>
              Buy
            </Button>
          </Link>
        </>
      ) : null}
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
                        #{dragon.id}, {RARITY[dragon.rarity].name} {ACTINO[dragon.action] ? `, ${ACTINO[dragon.action]}` : ''}
                      </Text>
                    </CardContainer>
                  </Card>
                </div>
              </Link>
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
    </Container>
  );
}

export default MyDragons;
