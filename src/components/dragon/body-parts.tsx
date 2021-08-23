import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { Column } from 'components/column';

import { AuraIcon } from 'components/icons/aura';
import { HornsIcon } from 'components/icons/horns';
import { GrowthsIcon } from 'components/icons/growths';
import { SpotsIcon } from 'components/icons/spots';
import { TailIcon } from 'components/icons/tail';
import { WingsIcon } from 'components/icons/wings';
import { BodyIcon } from 'components/icons/body';
import { EyesIcon } from 'components/icons/eyes';
import { HeadIcon } from 'components/icons/head';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

import { Container, TitleRow } from './styles';

const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 40px;
  }
`;
const GensWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Prop = {
  gens: {
    max: number;
    value: string;
  }[];
  color: string;
};

export const BodyParts: React.FC<Prop> = ({ color, gens }) => {
  return (
    <Container color={color}>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
        >
          Body parts
        </Text>
        <img
          src="/icons/body.svg"
          alt="body"
        />
      </TitleRow>
      <GensWrapper>
        <GensContainer>
          {gens.map((gen, index) => (
            <Column
              key={`body-${index}`}
              color={Colors.White}
              max={Number(gen.max)}
              value={Number(gen.value)}
              invert={true}
            />
          ))}
        </GensContainer>
        <GensContainer>
          <AuraIcon />
          <HornsIcon />
          <GrowthsIcon />
          <SpotsIcon />
          <TailIcon />
          <WingsIcon />
          <BodyIcon />
          <EyesIcon />
          <HeadIcon />
        </GensContainer>
      </GensWrapper>
    </Container>
  );
};
