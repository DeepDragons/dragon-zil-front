import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { BrowserView, MobileView } from 'react-device-detect';
import Link from 'next/link';

import { Text } from 'components/text';
import { Modal } from 'components/modal';
import { useTranslation } from 'next-i18next';
import { ModalItem } from 'components/mobile/modal-item';
import { ActionBarTitle } from './action-bar-title';

import { Colors } from 'config/colors';
import { DragonObject } from 'lib/api';
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

  max-width: 1224px;
  width: 100%;
`;
const ActionsRow = styled.div`
  display: ${(p: ActionsRowProp) => p.show ? 'flex' : 'none' };
  align-items: center;
`;
const ActionsForNotFree = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 835px) {
    width: 100%;
  }
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
const MobileButton = styled.button`
  position: fixed;
  bottom: 16px;
  left: 10%;
  right: 10%;

  display: ${(p: ActionsRowProp) => p.show ? 'flex' : 'none' };
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
  price?: string;
  currentAction: number;
  transfer: () => void;
  hatchEgg: () => void;
  sale: () => void;
  buy: () => void;
  RemoveSale: () => void;
  RemoveBreed: () => void;
  mutate: () => void;
  fight: () => void;
  breed: () => void;
  suicide: () => void;
};

export const ActionBar: React.FC<Prop> = ({
  dragon,
  color,
  price,
  currentAction,
  transfer,
  hatchEgg,
  sale,
  buy,
  RemoveSale,
  RemoveBreed,
  mutate,
  fight,
  breed,
  suicide
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const address = useStore($wallet);
  const [modalShow, setModalShow] = React.useState(false);

  const isOwner = React.useMemo(() => {
    return dragon.owner.toLowerCase() === address?.base16.toLowerCase();
  }, [address, dragon]);

  const actionList = React.useMemo(() => {
    return [
      {
        icon: 'an-egg.svg',
        name: dragonLocale.t('actions.hatch_egg'),
        method: hatchEgg,
        show: dragon.stage == 0
      },
      {
        icon: 'transfer-icon.svg',
        name: dragonLocale.t('actions.transfer'),
        method: transfer,
        show: true
      },
      {
        icon: 'sale-icon.svg',
        name: dragonLocale.t('actions.sale'),
        method: sale,
        show: true
      },
      {
        icon: 'gen-lab.svg',
        name: dragonLocale.t('actions.mutate'),
        method: mutate,
        show: dragon.stage > 0
      },
      {
        icon: 'arena.svg',
        name: dragonLocale.t('actions.arena'),
        method: fight,
        show: dragon.stage > 0
      },
      {
        icon: 'an-egg.svg',
        name: dragonLocale.t('actions.breed'),
        method: breed,
        show: dragon.stage > 0
      },
      {
        icon: 'suicide.svg',
        name: dragonLocale.t('actions.suicide'),
        method: suicide,
        show: true
      },
    ].filter((el) => el.show);
  }, [dragon]);

  const handleMobileActino = React.useCallback((action) => {
    action.method();
    setModalShow(false);
  }, []);


  return (
    <Container>
      <ActionBarTitle
        isOwner={isOwner}
        dragon={dragon}
        color={color}
        price={price}
      />
      <ActionsForNotFree>
        {currentAction === 1 ? (
          <Link href={`/fights/${dragon.id}`}>
            <ActionButton color={color}>
              <img
                src={`/icons/arena.svg`}
                alt="action-icon"
                height="38"
              />
              <Text size="16px">
                {dragonLocale.t('actions.fight')}
              </Text>
            </ActionButton>
          </Link>
        ) : null}
        {currentAction === 2 && isOwner ? (
          <ActionButton
            color={color}
            onClick={RemoveBreed}
          >
            <img
              src={`/icons/an-egg.svg`}
              alt="action-icon"
              height="38"
            />
            <Text size="16px">
              {dragonLocale.t('actions.remove_breed')}
            </Text>
          </ActionButton>
        ) : null}
        {currentAction === 2 && !isOwner ? (
          <Link href={`/breed/${dragon.id}`}>
            <ActionButton color={color}>
              <img
                src={`/icons/an-egg.svg`}
                alt="action-icon"
                height="38"
              />
              <Text size="16px">\
                {dragonLocale.t('actions.bread_with')}
              </Text>
            </ActionButton>
          </Link>
        ) : null}
        {currentAction === 3 ? (
          <ActionButton
            color={color}
            onClick={() => isOwner ? RemoveSale() : buy()}
          >
            <img
              src={`/icons/sale-icon.svg`}
              alt="action-icon"
              height="38"
            />
            <Text size="16px">
              {isOwner ?
                dragonLocale.t('actions.sale_remove') : commonLocale.t('buy')}
            </Text>
          </ActionButton>
        ) : null}
      </ActionsForNotFree>
      <BrowserView>
        {dragon.actions.length === 0 ? (
          <ActionsRow show={isOwner}>
            {actionList.map((action) => (
              <ActionButton
                key={action.name}
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
        ) : null}
      </BrowserView>
      <MobileView>
        {dragon.actions.length === 0 ? (
          <MobileButton
            show={isOwner}
            onClick={() => setModalShow(true)}
          >
            <svg width="33" height="32" viewBox="0 0 33 32" fill="none">
              <path
                d="M16.5 5L19.9914 11.1944L26.9616 12.6008L22.1493 17.8356L22.9656 24.8992L16.5 21.94L10.0344 24.8992L10.8507 17.8356L6.03838 12.6008L13.0086 11.1944L16.5 5Z"
                fill={Colors.White}
              />
            </svg>
            <Text>
              {dragonLocale.t('actions.name')}
            </Text>
          </MobileButton>
        ) : null}
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
              {commonLocale.t('cancel')}
            </ModalItem>
          </ul>
        </Modal>
      </MobileView>
    </Container>
  );
};

export default ActionBar;
