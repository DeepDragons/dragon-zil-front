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

import { Container, Seporate } from './styles';
import { chunkArray } from '@/lib/chunks';

const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
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
`;
const Columns = styled.div`
  display: flex;
  flex-direction: column;
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
  loverId: string;
  myDragonId: string;
  lover: ARarity;
  myDragon: ARarity;
};

export const BreadGensForm: React.FC<Prop> = ({
  loverId,
  myDragonId,
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
            #{loverId}
          </Text>
        </GenNameContainer>
        <GenNameContainer>
          <Text fontColors={myDragon.color}>
            #{myDragonId}
          </Text>
        </GenNameContainer>
      </Row>
      <GensWrapper>
        <Columns>
          {lover.gensImage.map((g) => (
            <LinePercent
              max={g.max}
              value={Number(g.value)}
              color={lover.color}
            />
          ))}
        </Columns>
        <Seporate />
        <Columns>
          {myDragon.gensImage.map((g) => (
            <LinePercent
              max={g.max}
              value={Number(g.value)}
              color={myDragon.color}
            />
          ))}
        </Columns>
      </GensWrapper>
      </GensContainer>
    </Container>
  );
};
