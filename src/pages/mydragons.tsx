import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';
import { useStore } from 'effector-react';
import Link from 'next/link';
import Loader from "react-loader-spinner";

import { Navbar } from 'components/nav-bar';
import { Card } from 'components/card';
import { SkeletCard } from 'components/skelet/card';
import { FilterBar } from 'components/filter-bar';
import { $wallet } from 'store/wallet';
import { $myDragons, contctDragons } from 'store/my-dragons';
import { DragonAPI } from 'lib/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  margin-bottom: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  max-width: 943px;
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
    } catch {
      //
    }

    setLoading(false);
  }

  React.useEffect(() => {
    if (address) {
      fetchData()
        .then(() => setSkelet(false))
        .catch(() => setSkelet(false));
    }
  }, [address]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => null);
    }
  }, []);

  return (
    <>
      <BrowserView>
        <Container>
          <Navbar />
          <FilterBar
            title="My dragons"
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
                  <Link
                    key={index}
                    href={`/dragon/${dragon.id}`}
                  >
                    <div>
                      <Card dragon={dragon} />
                    </div>
                  </Link>
                ))}
              </>
            )}
          </Wrapper>
          {loading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={30}
              width={100}
            />
          ) : null}
        </Container>
      </BrowserView>
      <MobileView>
        <Container>
          <h1> This is rendered only in mobile </h1>
        </Container>
      </MobileView>
    </>
  );
}

export default MyDragons;
