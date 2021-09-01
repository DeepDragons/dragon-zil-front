
import React from 'react';
import styled from 'styled-components';

import { RarityImage } from 'components/rarity-image';
import { SelectPalce } from 'components/select-palce';
import { Text } from 'components/text';
import { Button } from 'components/button';
import { DragonsSelectModal } from 'components/modals/dragons-select';

import { Colors } from 'config/colors';
import { Container } from './styles';
import { DragonObject } from '@/lib/api';

const MainContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  div {
    margin: 10px;
  }

  @media (max-width: 704px) {
    flex-direction: column;
  }
`;
const DragonImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Prop = {
  dragon: DragonObject;
  myDragon: null | DragonObject;
  color: Colors | string;
  btnColor: Colors | string;
  icon: string;
  setDragon: (dragon: DragonObject) => void;
  onStart: () => void;
};

export const ChoiceWith: React.FC<Prop> = ({
  dragon,
  color,
  children,
  btnColor,
  icon,
  myDragon,
  setDragon,
  onStart
}) => {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <MainContainer color={color}>
      <Row>
        <DragonImageWrapper>
          <RarityImage
            id={dragon.id}
            url={dragon.url}
            rarity={dragon.rarity}
          />
          <Text>
            #{dragon.id}
          </Text>
        </DragonImageWrapper>
        <img
          src={`/icons/${icon}`}
          alt="action"
        />
        <DragonImageWrapper>
          {myDragon ? (
            <RarityImage
              id={myDragon.id}
              url={myDragon.url}
              rarity={myDragon.rarity}
              onClick={() => setIsShow(true)}
            />
          ) : (
            <SelectPalce
              onClick={() => setIsShow(true)}
              color={color}
            />
          )}
          <Text>
            #{myDragon?.id || ''}
          </Text>
        </DragonImageWrapper>
      </Row>
      {myDragon ? (
        <Button
          color={btnColor}
          onClick={onStart}
        >
          {children}
        </Button>
      ) : null}
      <DragonsSelectModal
        show={isShow}
        onSelect={setDragon}
        onClose={() => setIsShow(false)}
      />
    </MainContainer>
  );
};
