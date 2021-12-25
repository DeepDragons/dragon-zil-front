import React from "react";
import { useTranslation } from "next-i18next";
import { compareRadar } from "lib/radar";
import { DragonObject } from "@/lib/api";
import { TitleUpgradeGens } from "./upgrade-gens-title";
import { Container } from "./styles";

type Prop = {
  loverDragon: DragonObject;
  myDragon: DragonObject;
  color: string;
};

export var CompareCombatGens: React.FC<Prop> = function ({
  loverDragon,
  myDragon,
  color,
}) {
  const commonLocale = useTranslation(`common`);

  React.useEffect(() => {
    const ctx = document.querySelector(`#combat`) as HTMLCanvasElement;

    try {
      if (ctx) {
        compareRadar(loverDragon, myDragon, ctx);
      }
    } catch {
      //
    }
  }, [loverDragon, myDragon]);

  return (
    <Container color={color}>
      <TitleUpgradeGens icon="gens.svg">
        {commonLocale.t(`compare_gens_title`)}
      </TitleUpgradeGens>
      <div>
        <canvas id="combat" height="410" />
      </div>
    </Container>
  );
};

export default CompareCombatGens;
