import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject } from 'lib/api';
import { trim } from 'lib/trim';
import { viewAddress } from 'lib/viewblock';
import { $wallet } from 'store/wallet';

type ActionButtonProp = {
  color: string;
}

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

  margin: 0 0 0 16px;
  padding: 9px 16px 0 16px;

  :hover :enabled {
    border: solid 1px ${(p: ActionButtonProp) => p.color};
  }

  :disabled {
    opacity: 0.3;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

type Prop = {
  dragon: DragonObject;
  color: string;
  transfer: () => void;
  sale: () => void;
  mutate: () => void;
  fight: () => void;
  breed: () => void;
  suicide: () => void;
};

export const ActionBar: React.FC<Prop> = ({
  dragon,
  color,
  transfer,
  sale,
  mutate,
  fight,
  breed,
  suicide
}) => {
  const address = useStore($wallet);

  const isOwner = React.useMemo(() => {
    return dragon.owner.toLowerCase() === address?.base16.toLowerCase();
  }, [address, dragon]);

  return (
    <Container>
      <TitleWrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          size="50px"
          css="margin: 0;"
        >
          Dragon #{dragon.id}
        </Text>
        <Text
          fontColors={Colors.Muted}
          fontVariant={StyleFonts.FiraSansRegular}
          size="16px"
          css="display: flex;align-items: center;justify-content: space-evenly;"
        >
          Owner:
          <a
            href={viewAddress(dragon.owner)}
            target='_blank'
          >
            <Text
              fontColors={Colors.White}
              css="text-indent: 6px;"
            >
              {isOwner ? 'You' : trim(dragon.owner)}
            </Text>
          </a>
        </Text>
      </TitleWrapper>
      <ActionsRow>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={transfer}
        >
          <img
            src="/icons/transfer-icon.svg"
            alt="transfer"
            height="38"
          />
          <Text size="16px">
            Transfer
          </Text>
        </ActionButton>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={sale}
        >
          <img
            src="/icons/sale-icon.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            On sale
          </Text>
        </ActionButton>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={mutate}
        >
          <img
            src="/icons/gen-lab.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            Mutate
          </Text>
        </ActionButton>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={fight}
        >
          <img
            src="/icons/arena.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            To arena
          </Text>
        </ActionButton>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={breed}
        >
          <img
            src="/icons/an-egg.svg"
            height="38"
            alt="Sale"
          />
          <Text size="16px">
            Breed
          </Text>
        </ActionButton>
        <ActionButton
          disabled={!isOwner}
          color={color}
          onClick={suicide}
        >
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
