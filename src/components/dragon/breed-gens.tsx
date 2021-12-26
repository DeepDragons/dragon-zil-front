import React from "react";
import styled from "styled-components";

import { Text } from "components/text";
import { useTranslation } from "next-i18next";
import { LinePercent } from "components/line-percent";

import { Colors } from "config/colors";
import { AuraIcon } from "components/icons/aura";
import { HornsIcon } from "components/icons/horns";
import { GrowthsIcon } from "components/icons/growths";
import { SpotsIcon } from "components/icons/spots";
import { TailIcon } from "components/icons/tail";
import { WingsIcon } from "components/icons/wings";
import { BodyIcon } from "components/icons/body";
import { EyesIcon } from "components/icons/eyes";
import { HeadIcon } from "components/icons/head";
import { TitleUpgradeGens } from "./upgrade-gens-title";

import { Container, Seporate } from "./styles";

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
const Gen = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type ARarity = {
  gensImage: {
    max: number;
    value: string;
  }[];
  color: string;
  name: string;
};

type Prop = {
  loverId: string;
  myDragonId: string;
  lover: ARarity;
  myDragon: ARarity;
};

function createIcon(index: number, color: string) {
  return [
    <AuraIcon color={color} key="0"/>,
    <HornsIcon color={color} key="1"/>,
    <GrowthsIcon color={color} key="2"/>,
    <SpotsIcon color={color} key="3"/>,
    <TailIcon color={color} key="4"/>,
    <WingsIcon color={color} key="5"/>,
    <BodyIcon color={color} key="6"/>,
    <EyesIcon color={color} key="7"/>,
    <HeadIcon color={color} key="8"/>,
  ][index];
}

export var BreadGensForm: React.FC<Prop> = function ({
  loverId,
  myDragonId,
  lover,
  myDragon,
}) {
  const commonLocale = useTranslation(`common`);

  return (
    <Container color={Colors.Muted}>
      <TitleUpgradeGens>{commonLocale.t(`body_parts`)}</TitleUpgradeGens>
      <GensContainer>
        <Row>
          <GenNameContainer>
            <Text fontColors={lover.color}>
              #
              {loverId}
            </Text>
          </GenNameContainer>
          <GenNameContainer>
            <Text fontColors={myDragon.color}>
              #
              {myDragonId}
            </Text>
          </GenNameContainer>
        </Row>
        <GensWrapper>
          <Columns>
            {lover.gensImage.map((g, index) => (
              <Gen key={index}>
                {createIcon(index, lover.color)}
                <LinePercent
                  max={g.max}
                  value={Number(g.value)}
                  color={lover.color}
                />
              </Gen>
            ))}
          </Columns>
          <Seporate />
          <Columns>
            {myDragon.gensImage.map((g, index) => (
              <Gen key={index}>
                <LinePercent
                  max={g.max}
                  value={Number(g.value)}
                  color={myDragon.color}
                />
                {createIcon(index, myDragon.color)}
              </Gen>
            ))}
          </Columns>
        </GensWrapper>
      </GensContainer>
    </Container>
  );
};
