import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1200px;
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
  border-radius: 16px;
  min-width: 100px;
  min-height: 100px;

  margin: 16px;
  padding: 9px 16px 0 16px;

  :hover {
    box-shadow: inset 9px 4px 5px #8945f3;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

type Prop = {
  id: string;
};

export const ActionBar: React.FC<Prop> = ({ id }) => {
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
          size="18px"
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
        <ActionButton>
          <img
            src="/icons/transfer-icon.svg"
            alt="transfer"
          />
          <Text size="18px">
            Transfer
          </Text>
        </ActionButton>
        <ActionButton>
          <img
            src="/icons/sale-icon.svg"
            height="36"
            alt="Sale"
          />
          <Text size="18px">
            On sale
          </Text>
        </ActionButton>
        <ActionButton>
          <img
            src="/icons/gen-lab.svg"
            alt="Sale"
          />
          <Text size="18px">
            Genlab
          </Text>
        </ActionButton>
        <ActionButton>
          <img
            src="/icons/arena.svg"
            alt="Sale"
          />
          <Text size="18px">
            To arena
          </Text>
        </ActionButton>
        <ActionButton>
          <img
            src="/icons/an-egg.svg"
            alt="Sale"
          />
          <Text size="18px">
            Breed
          </Text>
        </ActionButton>
        <ActionButton>
          <img
            src="/icons/suicide.svg"
            alt="Sale"
          />
          <Text size="18px">
            Suicide
          </Text>
        </ActionButton>
      </ActionsRow>
    </Container>
  );
};
