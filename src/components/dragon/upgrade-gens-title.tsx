import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Prop = {
  icon?: string;
}

export const TitleUpgradeGens: React.FC<Prop> = ({
  children,
  icon = 'body.svg'
}) => {
  return (
    <TitleRow>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
          css="margin-right: 10px;"
        >
          {children}
        </Text>
        <img
          src={`/icons/${icon}`}
          alt="gens"
        />
      </TitleRow>
    </TitleRow>
  );
};
