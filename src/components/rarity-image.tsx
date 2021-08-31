import React from 'react';

import {
  RareAura,
  CommonAura,
  UncommonAura,
  MythicalAura,
  LegendaryAura,
  ImmortalAura,
  ArcanaAura,
  AncientAura
} from 'components/aura';

import { EMPTY } from 'config/emty';
import { RARITY } from 'lib/rarity';
import { Colors } from '@/config/colors';

type Prop = {
  id: string;
  url: string;
  rarity: number;
  width?: number;
  height?: number;
  onClick?: () => void;
};

export const RarityImage: React.FC<Prop> = ({
  id,
  rarity,
  url,
  width,
  height,
  onClick = () => null
}) => {
  const rarityInfo = React.useMemo(() => {
    return RARITY[rarity];
  }, [rarity]);

  return [
    <CommonAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <UncommonAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <RareAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <MythicalAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <LegendaryAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <ImmortalAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <ArcanaAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />,
    <AncientAura
      id={id}
      url={url}
      width={width}
      height={height}
      color={rarityInfo.color}
      onClick={onClick}
    />
  ][rarity];
};
