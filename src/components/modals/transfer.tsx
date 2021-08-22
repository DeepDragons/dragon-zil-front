import React from 'react';
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { Input } from 'components/input';
import { Button } from 'components/button';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  stage: number;
  id: string;
  onClose: () => void;
};

export const TransferModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          Transfer #{id}
        </ModalTitle>
      )}
      show={show}
      onClose={onClose}
    >
      <Container>
        <Text
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          You can transfer your {dragonStage} to your friends.
        </Text>
        <Input
          fontColors={Colors.LightBlue}
          placeholder="zil1wl38cwww2u3g8wzgutxlxtxwwc0rf7jf27zace"
          border="2"
          css="text-align: center;"
        />
        <ButtonsWrapper>
          <ModalButton>
            Transfer
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            onClick={onClose}
          >
            Cancel
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
