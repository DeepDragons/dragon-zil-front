import React from "react";
import Image from 'next/image';
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import { Colors } from "config/colors";

import { Container } from "./styles";
import { Text } from 'components/text';
import { StyleFonts } from "@/config/fonts";

const WoundContainer = styled(Container)`
  padding: 13px;
  max-width: 412px;

  .wound-img {
    cursor: pointer;
    border-radius: 5px;
    border: solid 1px transparent !important;
    :hover {
      border: solid 1px ${Colors.Success} !important;
    }
  }
`;
const WoundWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const WoundImageWrapper = styled.div`
  margin: 2px;
`;

type Prop = {
  list: number[] | string[];
  color: string;
  onHeal: (id: number) => void;
};

export var Wounds: React.FC<Prop> = function ({ list, color, onHeal }) {
  const dragonLocale = useTranslation(`dragon`);

  return (
    <WoundContainer color={color}>
      <Text fontVariant={StyleFonts.FiraSansSemiBold} size="24px">
        {dragonLocale.t('wounds')}
      </Text>
      <WoundWrapper>
        {list.map((wound, index) => (
          <WoundImageWrapper
            color={color}
            key={Number(wound) + index}
          >
            <Image
              src={`/imgs/wounds/${wound}.webp`}
              alt="wound img"
              className="wound-img"
              height="40"
              width="40"
              onClick={() => onHeal(Number(wound))}
            />
          </WoundImageWrapper>
        ))}
      </WoundWrapper>
    </WoundContainer>
  );
};

export default Wounds;
