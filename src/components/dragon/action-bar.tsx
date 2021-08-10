import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1024px;
  width: 100%;
`;
const ActionsRow = styled.div`
  display: flex;
  align-items: center;
`;
const ActionButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${Colors.Darker};

  border: 0;
  border: solid 1px ${Colors.Darker};
  border-radius: 16px;
  min-width: 100px;
  min-height: 100px;

  margin: 16px;
  padding: 9px 16px 0 16px;

  :hover {
    border: solid 1px #8945f3;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

type Prop = {
  id: string;
  transfer: () => void;
  sale: () => void;
  mutate: () => void;
  fight: () => void;
  breed: () => void;
  suicide: () => void;
};

export const ActionBar: React.FC<Prop> = ({
  id,
  transfer,
  sale,
  mutate,
  fight,
  breed,
  suicide
}) => {
  return (
    <Container>
      <TitleWrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          size="50px"
          css="margin: 0;"
        >
          Dragon #{id}
        </Text>
        <Text
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
          size="16px"
          css="display: flex;align-items: center;justify-content: space-evenly;"
        >
          owner:
          <a href="">
            <Text fontColors={Colors.White}>
              You
            </Text>
          </a>
        </Text>
      </TitleWrapper>
      <ActionsRow>
        <ActionButton onClick={transfer}>
          <img
            src="/icons/transfer-icon.svg"
            alt="transfer"
            height="38"
          />
          <Text size="16px">
            Transfer
          </Text>
        </ActionButton>
        <ActionButton onClick={sale}>
          <img
            src="/icons/sale-icon.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            On sale
          </Text>
        </ActionButton>
        <ActionButton onClick={mutate}>
          <img
            src="/icons/gen-lab.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            Mutate
          </Text>
        </ActionButton>
        <ActionButton onClick={fight}>
          <img
            src="/icons/arena.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            To arena
          </Text>
        </ActionButton>
        <ActionButton onClick={breed}>
          <img
            src="/icons/an-egg.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            Breed
          </Text>
        </ActionButton>
        <ActionButton onClick={suicide}>
          <img
            src="/icons/suicide.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            Suicide
          </Text>
        </ActionButton>
      </ActionsRow>
    </Container>
  );
};
