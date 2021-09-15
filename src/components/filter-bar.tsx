import React from 'react';

import styled from 'styled-components';

import { Text } from 'components/text';
import { DropDown } from 'components/drop-down';
import { PopUpButton } from 'components/popup-btn';

import { StyleFonts } from 'config/fonts';
import { useTranslation } from 'next-i18next';

type Prop = {
  title: string;
  price?: boolean;
  rarity?: boolean;
  items?: string[];
  selectedSort?: number;
  onSelectSort?: (index: number) => void;
  onFilter?: (from: number, to: number) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  max-width: 943px;
  width: 90%;
  margin-top: 40px;

  @media (max-width: 500px) {
    width: 98%;
    justify-content: center;
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterBar: React.FC<Prop> = ({
  title,
  price = false,
  items = [],
  selectedSort = 0,
  onSelectSort = () => null,
  onFilter = () => null
}) => {
  const commonLocale = useTranslation('common');
  const [showSort, setShowSort] = React.useState(false);

  return (
    <Container>
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="30px"
      >
        {title}
      </Text>
      <Wrapper>
        {items.length > 0 ? (
          <DropDown
            items={items}
            selected={selectedSort}
            onSelected={onSelectSort}
            open={showSort}
            onClose={() => setShowSort(false)}
            onShow={() => setShowSort(true)}
          />
        ) : null}
        {price ? (
          <PopUpButton onApply={onFilter}>
            {commonLocale.t('price')}
          </PopUpButton>
        ) : null}
      </Wrapper>
    </Container>
  );
};
