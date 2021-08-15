import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject } from 'lib/api';
import { trim } from 'lib/trim';
import { viewAddress } from 'lib/viewblock';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;

  margin-left: 16px;
`;
const InfoText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

type Prop = {
  dragon: DragonObject;
  isOwner: boolean;
};

export const ActionBarTitle: React.FC<Prop> = ({
  dragon,
  isOwner
}) => {
  return (
    <TitleWrapper>
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="50px"
        css="margin: 0;"
      >
        Dragon #{dragon.id}
      </Text>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
        size="16px"
      >
        Owner:
        <a
          href={viewAddress(dragon.owner)}
          target='_blank'
        >
          <Text
            fontColors={Colors.White}
            css="text-indent: 6px;"
          >
            {isOwner ? 'You' : trim(dragon.owner)}
          </Text>
        </a>
      </InfoText>
    </TitleWrapper>
  );
};
