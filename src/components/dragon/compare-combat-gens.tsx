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
