import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject } from 'lib/api';
import { trim } from 'lib/trim';
import { viewAddress } from 'lib/viewblock';
import { RARITY } from 'lib/rarity';

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
  font-size: 16px;

  margin: 0;
`;
const LinkText = styled(Text)`
  text-indent: 6px;
  margin: 0;
  color: ${Colors.White};
`;

type Prop = {
  dragon: DragonObject;
  isOwner: boolean;
  color: string | Colors;
  price?: string | number;
};

export const ActionBarTitle: React.FC<Prop> = ({
  dragon,
  color,
  isOwner,
  price
}) => {
  const commonLocale = useTranslation('common');

  return (
    <TitleWrapper>
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        size="50px"
        css="margin: 0;"
      >
        {commonLocale.t('dragon')} #{dragon.id}
      </Text>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
      >
        {commonLocale.t('owner')}:
        <a
          href={viewAddress(dragon.owner)}
          target='_blank'
        >
          <LinkText>
            {isOwner ? 'You' : trim(dragon.owner)}
          </LinkText>
        </a>
      </InfoText>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
      >
        {commonLocale.t('rarity')}:&#160;<Text
          fontColors={color}
          css="margin: 0;"
        >
          {RARITY[dragon.rarity].name}
        </Text>
      </InfoText>
      {price ? (
        <InfoText
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
        >
          {commonLocale.t('price')}:&#160;<Text
            fontColors={color}
            css="margin: 0;"
          >
            {price}
          </Text>
        </InfoText>
      ) : null}
    </TitleWrapper>
  );
};
