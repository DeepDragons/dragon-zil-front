import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';
import { TitleUpgradeGens } from 'components/dragon/upgrade-gens-title';
import { Tab } from 'components/tab';
import { IntInput } from 'components/int-input';
import { Button } from 'components/button';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container } from 'components/dragon/styles';
import { chunkArray } from '@/lib/chunks';

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type Prop = {
  gens: string;
  color: string;
};

const tabElements = [
  <DefenceIcon />,
  <AttackIcon />
];
export const MobileUpgradeGens: React.FC<Prop> = ({
  gens,
  color
}) => {
  const [selected, setSelected] = React.useState(0);
  const [gen, setGen] = React.useState(1);

  const gensChain = React.useMemo(() => {
    return genParse(gens).splice(1);
  }, [gens]);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx) {
        const chunk = chunkArray(gensChain, 10);
        radar(chunk, ctx);
      }
    } catch {
    }
  }, [gensChain]);

  console.log(gensChain[selected === 0 ? gen : gen + 9]);

  return (
    <Container color={color}>
      <TitleUpgradeGens>
        Upgrade gens
      </TitleUpgradeGens>
      <Column>
        <div>
          <canvas
            id="combat"
            height="300"
          />
        </div>
        <Tab
          elements={tabElements}
          selected={selected}
          onSelected={setSelected}
        >
          Choose a gen
        </Tab>
        <div>
          <LinePercent
            max={99}
            width={250}
            value={gensChain[selected === 0 ? gen - 1 : gen + 9]}
            color={selected === 0 ? Colors.Success : Colors.Danger}
          />
        </div>
        <IntInput
          value={gen}
          max={10}
          onInput={setGen}
        >
          A gen index
        </IntInput>
        <Button
          color={Colors.Success}
          css="padding: 20px 45px 20px 45px;"
        >
          Upgrade for 10 $ZLP
        </Button>
      </Column>
    </Container>
  );
};
