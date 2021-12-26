import React from "react";
import Image from 'next/image';
import styled from "styled-components";

import { RarityImage } from "components/rarity-image";
import { SelectPalce } from "components/select-palce";
import { Text } from "components/text";
import { Button } from "components/button";
import { DragonsSelectModal } from "components/modals/dragons-select";

import { Colors } from "config/colors";
import { DragonObject } from "@/lib/api";
import { Container } from "./styles";

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

  align-items: flex-start;

  div {
    margin: 10px;
  }

  @media (max-width: 704px) {
    flex-direction: column;
    align-items: center;
  }
`;
const DragonImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WoundsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin: 10px;
  max-width: 200px;

  span {
    margin: 1px;
  }
  .wound-img {
    border-radius: 5px;
  }
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

export var ChoiceWith: React.FC<Prop> = function ({
  dragon,
  color,
  children,
  btnColor,
  icon,
  myDragon,
  setDragon,
  onStart,
}) {
  const [isShow, setIsShow] = React.useState(false);

  // TODO: add real wounds.
  const wounds0 = [1,3,4,5,6,7];
  const wounds1 = [8, 9, 10, 11, 12];

  return (
    <MainContainer color={color}>
      <Row>
        <DragonImageWrapper>
          <RarityImage id={dragon.id} url={dragon.url} rarity={dragon.rarity} />
          <Text>
            #
            {dragon.id}
          </Text>
          <WoundsWrapper>
            {wounds0.map((wound, index) => (
              <span key={wound + index}>
                <Image
                  src={`/imgs/wounds/${wound}.jpg`}
                  alt="wound img"
                  className="wound-img"
                  height="25"
                  width="25"
                />
              </span>
            ))}
          </WoundsWrapper>
        </DragonImageWrapper>
        <Image
          src={`/imgs/icons/${icon}`}
          alt="action"
          height="38"
          width="44"
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
            <SelectPalce onClick={() => setIsShow(true)} color={color} />
          )}
          <Text>
            #
            {myDragon?.id || ``}
          </Text>
          {myDragon ? (
            <WoundsWrapper>
              {wounds1.map((wound, index) => (
                <span key={wound + index}>
                  <Image
                    src={`/imgs/wounds/${wound}.jpg`}
                    alt="wound img"
                    className="wound-img"
                    height="25"
                    width="25"
                  />
                </span>
              ))}
            </WoundsWrapper>
          ) : null}
        </DragonImageWrapper>
      </Row>
      {myDragon ? (
        <Button color={btnColor} onClick={onStart}>
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

export default ChoiceWith;
