import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';

import { Text } from 'components/text';
import { Column } from 'components/column';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';
import { chunkArray } from 'lib/chunks';

import { Container, Seporate } from './styles';

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 34px;
`;
const TabSelector = styled.img`
  cursor: pointer;
  border-radius: 8px;
`;
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

type Prop = {
  gens: string;
  color: string;
};

export const UpgradeGens: React.FC<Prop> = ({
  gens,
  color
}) => {
  const [selected, setSelected] = React.useState(isBrowser ? 1 : 0);

  const gensArray = React.useMemo(() => {
    const list = genParse(gens).splice(1);

    return chunkArray(list, 10);
  }, [gens]);

  return (
    <Container color={color}>
      <TitleRow>
        <TitleRow>
          <Text
            fontVariant={StyleFonts.FiraSansSemiBold}
            size="24px"
          >
            Upgrade gens
          </Text>
          <img
            src="/icons/body.svg"
            alt="gens"
          />
        </TitleRow>
        <TabRow>
          <TabSelector
            style={{
              background: selected === 0 ? Colors.Darker : 'none'
            }}
            src="/icons/graph.svg"
            alt="graph"
            onClick={() => setSelected(0)}
          />
          {isBrowser ? (
            <TabSelector
              style={{
                background: selected === 1 ? Colors.Darker : 'none'
              }}
              src="/icons/radar.svg"
              alt="radar"
              onClick={() => setSelected(1)}
            />
          ) : null}
        </TabRow>
      </TitleRow>
      <GensContainer>
        <Row>
          <GenNameContainer>
            <DefenceIcon />
            <Text>
              Defence
            </Text>
          </GenNameContainer>
          <GenNameContainer>
            <Text>
              Attack
            </Text>
            <AttackIcon />
          </GenNameContainer>
        </Row>
      </GensContainer>
    </Container>
  );
};
