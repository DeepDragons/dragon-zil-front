import React from 'react';
import { TitleUpgradeGens } from './upgrade-gens-title';
import { compareRadar } from 'lib/radar';
import { Container } from './styles';
import { DragonObject } from '@/lib/api';

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
  }, [loverDragon, myDragon]);

  return (
    <Container color={color}>
      <TitleUpgradeGens icon="gens.svg">
        Compare combat gens
      </TitleUpgradeGens>
      <div>
        <canvas
          id="combat"
          height="410"
        />
      </div>
    </Container>
  );
};

export default CompareCombatGens;
