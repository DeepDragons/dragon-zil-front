import React from "react";

import {
  RareAura,
  CommonAura,
  UncommonAura,
  MythicalAura,
  LegendaryAura,
  ImmortalAura,
  ArcanaAura,
  AncientAura,
} from "components/aura";

import { RARITY } from "lib/rarity";

type Prop = {
  id: string;
  url: string;
  rarity: number;
  width?: number;
  height?: number;
  onClick?: () => void;
};

export var RarityImage: React.FC<Prop> = function ({
  id,
  rarity,
  url,
  width,
  height,
  onClick = () => null,
}) {
  const rarityInfo = React.useMemo(() => RARITY[rarity], [rarity]);

  const uri = React.useMemo(() => {
    const list = url.split(`/`);
    const name = list.pop();

    list.push(`c_scale,w_450`);
    list.push(String(name));
    return list.join(`/`);
  }, [url]);

  return [
    <CommonAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <UncommonAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <RareAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <MythicalAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <LegendaryAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <ImmortalAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <ArcanaAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <AncientAura
      id={id}
      url={uri}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
  ][rarity];
};

export default RarityImage;
