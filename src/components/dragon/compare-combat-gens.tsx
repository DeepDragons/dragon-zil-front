import React from 'react';
import { TitleUpgradeGens } from './upgrade-gens-title';
import { useTranslation } from 'next-i18next';
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
  const commonLocale = useTranslation('common');

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx) {
        setTimeout(() => {
          compareRadar(
            loverDragon,
            myDragon,
            ctx
          );
        }, 300);
      }
    } catch {
      //
    }
  }, [loverDragon, myDragon]);

  return (
    <Container color={color}>
      <TitleUpgradeGens icon="gens.svg">
        {commonLocale.t('compare_gens_title')}
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
