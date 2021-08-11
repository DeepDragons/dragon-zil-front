import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';
import { useStore } from 'effector-react';
import Link from 'next/link';

import { Navbar } from 'components/nav-bar';
import { Card } from 'components/card';
import { SkeletCard } from 'components/skelet/card';
import { FilterBar } from 'components/filter-bar';
import { Rarity } from 'config/rarity';
import { $wallet } from 'store/wallet';
import { $myDragons, updateDragons } from 'store/my-dragons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  max-width: 943px;
`;
export const MyDragons: NextPage = () => {
  const address = useStore($wallet);
  const dragons = useStore($myDragons);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (address) {
      const url = `http://127.0.0.1:8083/api/v1/dragons?owner=${String(address?.base16).toLowerCase()}`;

      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
          updateDragons(data.map((el) => ({
            type: 0,
            rarity: Rarity.Common,
            url: el.url,
            id: String(el.id),
            stage: el.stage
          })));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [address]);

  return (
    <>
      <BrowserView>
        <Container>
          <Navbar />
          <FilterBar
            title="My dragons"
          />
          <Wrapper>
            {loading ? (
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
