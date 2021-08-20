import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container } from 'components/dragon/styles';
import { chunkArray } from '@/lib/chunks';

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleUpgradeGens: React.FC = ({
  children
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
          src="/icons/body.svg"
          alt="gens"
        />
      </TitleRow>
    </TitleRow>
  );
};
