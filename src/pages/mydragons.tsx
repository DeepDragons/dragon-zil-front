import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { BrowserView, MobileView } from 'react-device-detect';
import Link from 'next/link';

import { Navbar } from 'components/nav-bar';
import { Card } from 'components/card';
import { FilterBar } from 'components/filter-bar';

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

const dragons = [
  {
    url: 'https://res.cloudinary.com/dragonseth/image/upload/1_1.png',
    id: '1',
    type: 0
  },
  {
    url: 'https://res.cloudinary.com/dragonseth/image/upload/1_2.png',
    id: '2',
    type: 2
  },
  {
    url: 'https://res.cloudinary.com/dragonseth/image/upload/1_3.png',
    id: '3',
    type: 4
  },
  {
    url: 'https://res.cloudinary.com/dragonseth/image/upload/1_4.png',
    id: '4',
    type: 6
  },
  {
    url: 'https://res.cloudinary.com/dragonseth/image/upload/1_5.png',
    id: '5',
    type: 2
  },
  // {
  //   url: 'https://res.cloudinary.com/dragonseth/image/upload/1_6.png',
  //   id: '6',
  //   type: 3
  // }
];

export const MyDragons: NextPage = () => (
  <>
    <BrowserView>
      <Container>
        <Navbar />
        <FilterBar
          title="My dragons"
        />
        <Wrapper>
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

export default MyDragons;
