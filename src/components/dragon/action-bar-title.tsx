import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Text } from "components/text";

import { Colors } from "config/colors";
import { DragonObject } from "lib/api";
import { trim } from "lib/trim";
import { viewAddress } from "lib/viewblock";
import { RARITY } from "lib/rarity";
import { StyleFonts } from "@/config/fonts";

type Textbutton = {
  isOwner: boolean;
};

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
  padding: 0 10px 0 10px;
  margin: 0;
  color: ${Colors.White};
`;
const Textbutton = styled(Text)`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 0 10px 0 10px;
  margin: 0;

  ${(p: Textbutton) => (p.isOwner
    ? `
      cursor: pointer;
      user-select: none;

      :hover {
        border: 1px solid ${Colors.Darker};
        background: ${Colors.Darker};
      } 
    `
    : ``)}
`;

type Prop = {
  dragon: DragonObject;
  isOwner: boolean;
  color: string | Colors;
  price?: string | number;
  name?: string;
  onChangeName?: () => void;
};

export var ActionBarTitle: React.FC<Prop> = function ({
  dragon,
  color,
  isOwner,
  price,
  name,
  onChangeName,
}) {
  const commonLocale = useTranslation(`common`);

  const handleChangeName = React.useCallback(() => {
    if (isOwner && onChangeName) {
      onChangeName();
    }
  }, [isOwner]);

  return (
    <TitleWrapper>
      <Text fontVariant={StyleFonts.FiraSansBold} size="50px" css="margin: 0;">
        {commonLocale.t(`dragon`)}
        {` `}
        #
        {dragon.id}
      </Text>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
      >
        {commonLocale.t(`owner`)}
        :
        <a href={viewAddress(dragon.owner)} target="_blank" rel="noreferrer">
          <LinkText>
            {isOwner ? commonLocale.t(`you`) : trim(dragon.owner)}
          </LinkText>
        </a>
      </InfoText>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
      >
        {commonLocale.t(`rarity`)}
        :&#160;
        <Text fontColors={color} css="margin: 0;padding: 0 10px 0 10px;">
          {RARITY[dragon.rarity].name}
        </Text>
      </InfoText>
      <InfoText
        fontColors={Colors.Muted}
        fontVariant={StyleFonts.FiraSansRegular}
      >
        {commonLocale.t(`dragon_name`)}
        :&#160;
        <Textbutton
          fontColors={Colors.Success}
          isOwner={Boolean(isOwner && onChangeName)}
          onClick={handleChangeName}
        >
          {name || commonLocale.t(`no_name`)}
        </Textbutton>
      </InfoText>
      {price ? (
        <InfoText
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
        >
          {commonLocale.t(`price`)}
          :&#160;
          <Text fontColors={color} css="margin: 0;padding: 0 10px 0 10px;">
            {price}
          </Text>
        </InfoText>
      ) : null}
    </TitleWrapper>
  );
};
