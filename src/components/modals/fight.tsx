import React from 'react';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { IntInput } from 'components/int-input';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

export const FightsModal: React.FC<Prop> = ({
  show,
  id,
  onClose
}) => {
  const [zlp, setZLP] = React.useState(500);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          To arena #{id}
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
          Test the strength of your dragon by putting it on the arena.
        </Text>
        <IntInput
          value={zlp}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          Set a bet in ZLP
        </IntInput>
        <ButtonsWrapper>
          <ModalButton color={Colors.Danger}>
            Start fight
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
