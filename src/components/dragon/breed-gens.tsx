import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';
import { TitleUpgradeGens } from './upgrade-gens-title';

import { Colors } from 'config/colors';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container } from './styles';
import { chunkArray } from '@/lib/chunks';

const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const GenNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GensWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 16px;
  width: 300px;

  @media (max-width: 500px) {
    width: 250px;
  }
`;
const Gens = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
`;
const NumberOfGen = styled.a`
  cursor: pointer;
  background: ${Colors.Darker};
  border-radius: 7px;
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
`;

type ARarity = {
  gensImage: {
      max: number;
      value: string;
  }[];
  color: string;
  name: string;
}

type Prop = {
  lover: ARarity;
  myDragon: ARarity;
};

export const BreadGensForm: React.FC<Prop> = ({
  lover,
  myDragon
}) => {
  console.log(lover);
  console.log(myDragon);
  return (
    <Container color={Colors.Primary}>
      <TitleUpgradeGens>
        Body parts
      </TitleUpgradeGens>
      <GensContainer>
      <Row>
        <GenNameContainer>
          <Text fontColors={lover.color}>
            Lover #918
          </Text>
        </GenNameContainer>
        <GenNameContainer>
          <Text fontColors={myDragon.color}>
            You dragon #25
          </Text>
        </GenNameContainer>
      </Row>
      <GensWrapper>
      </GensWrapper>
      </GensContainer>
    </Container>
  );
};
