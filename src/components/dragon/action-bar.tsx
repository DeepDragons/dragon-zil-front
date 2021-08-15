import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { BrowserView, MobileView } from 'react-device-detect';

import { Text } from 'components/text';
import { Modal } from 'components/modal';
import { ModalItem } from 'components/mobile/modal-item';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject } from 'lib/api';
import { trim } from 'lib/trim';
import { viewAddress } from 'lib/viewblock';
import { $wallet } from 'store/wallet';

type ActionButtonProp = {
  color: string;
}

type ActionsRowProp = {
  show: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  max-width: 1024px;
  width: 100%;
`;
const ActionsRow = styled.div`
  display: ${(p: ActionsRowProp) => p.show ? 'flex' : 'none' };
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

  margin-left: 16px;
`;
const MobileButton = styled.button`
  position: fixed;
  bottom: 16px;
  left: 10%;
  right: 10%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 20;
  width: 80vw;
  border: 0;
  cursor: pointer;
  padding: 16px 16px 16px 10px;
  background: ${Colors.Darker};
  box-shadow: 0px 0px 24px ${Colors.Black};
  border-radius: 16px;

  user-select: none;

  :hover {
    border: 1px solid ${Colors.Muted};
  }
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
  const [modalShow, setModalShow] = React.useState(false);

  const isOwner = React.useMemo(() => {
    return dragon.owner.toLowerCase() === address?.base16.toLowerCase();
  }, [address, dragon]);

  const actionList = [
    {
      icon: 'transfer-icon.svg',
      name: 'Transfer',
      disabled: !isOwner,
      method: transfer
    },
    {
      icon: 'sale-icon.svg',
      name: 'On sale',
      disabled: !isOwner,
      method: sale
    },
    {
      icon: 'gen-lab.svg',
      name: 'Mutate',
      disabled: !isOwner,
      method: mutate
    },
    {
      icon: 'arena.svg',
      name: 'To arena',
      disabled: !isOwner,
      method: fight
    },
    {
      icon: 'an-egg.svg',
      name: 'Breed',
      disabled: !isOwner,
      method: breed
    },
    {
      icon: 'suicide.svg',
      name: 'Suicide',
      disabled: !isOwner,
      method: suicide
    },
  ];

  const handleMobileActino = React.useCallback((action) => {
    action.method();
    setModalShow(false);
  }, []);

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
      <BrowserView>
        <ActionsRow show={isOwner}>
          {actionList.map((action) => (
            <ActionButton
              key={action.name}
              disabled={action.disabled}
              color={color}
              onClick={action.method}
            >
              <img
                src={`/icons/${action.icon}`}
                alt="action-icon"
                height="38"
              />
              <Text size="16px">
                {action.name}
              </Text>
            </ActionButton>
          ))}
        </ActionsRow>
      </BrowserView>
      <MobileView>
        <MobileButton onClick={() => setModalShow(true)}>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none">
            <path
              d="M16.5 5L19.9914 11.1944L26.9616 12.6008L22.1493 17.8356L22.9656 24.8992L16.5 21.94L10.0344 24.8992L10.8507 17.8356L6.03838 12.6008L13.0086 11.1944L16.5 5Z"
              fill={Colors.White}
            />
          </svg>
          <Text>Actions</Text>
        </MobileButton>
        <Modal
          show={modalShow}
          onClose={() => setModalShow(false)}
        >
          <ul>
            {actionList.map((action, index) => (
              <ModalItem
                key={index}
                onClick={() => handleMobileActino(action)}
              >
                <img
                  src={`/icons/${action.icon}`}
                  alt="action-icon"
                  height="25"
                />
                <Text css="margin-left: 10px;">
                  {action.name}
                </Text>
              </ModalItem>
            ))}
            <ModalItem
              last
              onClick={() => setModalShow(false)}
            >
              Cancel
            </ModalItem>
          </ul>
        </Modal>
      </MobileView>
    </Container>
  );
};
