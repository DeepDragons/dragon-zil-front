
import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { Column } from 'components/column';
import { RarityImage } from 'components/rarity-image';
import { SelectPalce } from 'components/select-palce';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

import { Container } from './styles';
import { DragonObject } from '@/lib/api';

const MainContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    margin: 10px;
  }
`;
const DragonImageWrapper = styled.div`
`;

type Prop = {
  dragon: DragonObject;
  color: Colors | string;
};

export const ChoiceWith: React.FC<Prop> = ({ dragon, color }) => {
  return (
    <MainContainer color={color}>
      <DragonImageWrapper>
        <RarityImage
          id={dragon.id}
          url={dragon.url}
          rarity={dragon.rarity}
        />
      </DragonImageWrapper>
      <div>
        <svg
          width="53"
          height="45"
          viewBox="0 0 53 45"
          fill="none"
        >
          <path
            d="M20.9975 3.6933C16.1941 -1.2311 8.40608 -1.2311 3.60261 3.6933C-1.20087 8.61771 -1.20087 16.6017 3.60261 21.5261L26.5 45L49.3974 21.5261C54.2009 16.6017 54.2009 8.61771 49.3974 3.6933C44.5939 -1.2311 36.8059 -1.2311 32.0025 3.6933L26.5 9.3343L20.9975 3.6933Z"
            fill={Colors.Primary}
          />
        </svg>
      </div>
      <SelectPalce color={color}/>
    </MainContainer>
  );
};
