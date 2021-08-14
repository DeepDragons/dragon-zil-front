import React from 'react';

import styled from 'styled-components';

import { Text } from 'components/text';
import { DropDown } from 'components/drop-down';
import { PopUpButton } from 'components/popup-btn';

import { StyleFonts } from 'config/fonts';

type Prop = {
  title: string;
  price?: boolean;
  rarity?: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 943px;
  width: 90%;
  margin-top: 40px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const items = [
  'Rarity',
  'Strong'
];

export const FilterBar: React.FC<Prop> = ({
  title,
  price = false,
  rarity = false
}) => {
  const [filterBy, setFilterBy] = React.useState(0);
  const [filterbyFrom, setFilterbyFrom] = React.useState(0);
  const [filterbyTo, setFilterbyTo] = React.useState(100);

  const hanldeChangePriceFilter = React.useCallback((from, to) => {
    if (from !== filterbyFrom) {
      setFilterbyFrom(from);
    }
    if (to !== filterbyTo) {
      setFilterbyTo(to);
    }
  }, [filterbyTo, filterbyFrom]);

  return (
    <Container>
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="30px"
      >
        {title}
      </Text>
      <Wrapper>
        {rarity ? (
          <DropDown
            items={items}
            selected={filterBy}
            onSelected={setFilterBy}
          />
        ) : null}
        {price ? (
          <PopUpButton
            from={filterbyFrom}
            to={filterbyTo}
            onApply={() => console.log(filterbyFrom, filterbyTo)}
            onChange={hanldeChangePriceFilter}
          >
            Price
          </PopUpButton>
        ) : null}
      </Wrapper>
    </Container>
  );
};
