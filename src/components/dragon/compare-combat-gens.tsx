import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';
import { TitleUpgradeGens } from './upgrade-gens-title';

import { Colors } from 'config/colors';
import { compareRadar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container } from './styles';
import { chunkArray } from '@/lib/chunks';
import { DragonObject } from '@/lib/api';

const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Prop = {
  loverDragon: DragonObject;
  myDragon: DragonObject;
  color: string;
};

export const CompareCombatGens: React.FC<Prop> = ({
  loverDragon,
  myDragon,
  color
}) => {
  const canvos = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx) {
        compareRadar(
          loverDragon,
          myDragon,
          ctx
        );
      }
    } catch {
      //
    }
  }, [loverDragon, myDragon, canvos]);

  return (
    <Container color={color}>
      <TitleUpgradeGens icon="gens.svg">
        Compare combat gens
      </TitleUpgradeGens>
      <div>
        <canvas
          id="combat"
          ref={(n) => canvos.current = n}
          height="410"
        />
      </div>
    </Container>
  );
};
