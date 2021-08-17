import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-graceful-image';

import { RarityImage } from './rarity-image';

import { Colors } from 'config/colors';
import { RARITY } from 'lib/rarity';

type Prop = {
  dragon: {
    url: string;
    id: string;
    rarity: number;
  };
  onSelect?: () => void;
};

type ImageProp = {
  color?: string | Colors;
}

export const Container = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 16px;
  margin: 16px;
  border-radius: 16px;
  
  background: ${Colors.Darker};
`;
export const Image = styled.img`
  border-radius: 100%;
  background: ${Colors.Black};

  animation: fadeInFromNone 0.5s ease-out;

  transition: .3s;

  :hover {
    box-shadow: inset 0 0 40px ${(p: ImageProp) => p.color};
  }
`;
export const Empety = styled.div`
  border-radius: 100%;
  background: ${Colors.Dark};
  height: 250px;
  width: 250px;

  transition: .3s;

  :hover {
    box-shadow: inset 0 0 40px ${(p: ImageProp) => p.color};
  }
`;

export const Card: React.FC<Prop> = ({
  dragon,
  children,
  onSelect = () => null
}) => {

  return (
    <Container>
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
