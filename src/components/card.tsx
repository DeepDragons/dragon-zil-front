import React from 'react';
import styled from 'styled-components';

import { RarityImage } from './rarity-image';

import { Colors } from 'config/colors';
import { DragonObject } from '@/lib/api';
import { RARITY } from '@/lib/rarity';

type Prop = {
  dragon: DragonObject;
  onSelect?: () => void;
};

type ContainerProp = {
  color: string | Colors;
};

export const Container = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 16px;
  margin: 15px;
  border-radius: 16px;
  
  background: ${Colors.Darker};
  border: 1px solid transparent;

  animation: fadeInFromNone 0.5s ease-out;

  transition: .3s;

  :hover {
    border: 1px solid ${(p: ContainerProp) => p.color};
  }
`;
export const Empety = styled.div`
  border-radius: 100%;
  background: ${Colors.Dark};
  height: 250px;
  width: 250px;
`;

export const Card: React.FC<Prop> = ({
  dragon,
  children,
  onSelect = () => null
}) => {
  return (
    <Container color={RARITY[dragon.rarity].color}>
      <RarityImage
        id={dragon.id}
        rarity={dragon.rarity}
        url={dragon.url}
        onClick={onSelect}
      />
      {children}
    </Container>
  );
};
