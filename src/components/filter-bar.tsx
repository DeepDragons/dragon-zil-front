import React from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Text } from 'components/text';
import { DropDown } from 'components/drop-down';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1200px;
  width: 90%;
  margin-top: 40px;
`;

const items = [
  'Rarity',
  'Price'
];

export const FilterBar: React.FC<Prop> = ({
  title
}) => {
  const [filterBy, setFilterBy] = React.useState(0);

  return (
    <Container>
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="30px"
      >
        {title}
      </Text>
      <div>
        <Text
          fontVariant={StyleFonts.FiraSansRegular}
          size="18px"
        >
          Filter by
        </Text>
        <DropDown
          items={items}
          selected={filterBy}
          onSelected={setFilterBy}
        />
      </div>
    </Container>
  );
};
