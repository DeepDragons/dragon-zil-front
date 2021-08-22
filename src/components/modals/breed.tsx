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

export const BreedModal: React.FC<Prop> = ({
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
          Breed #{id}
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
          You can make money on your dragons, just like a pimp. Expose your most beautiful whores for ZLP.
        </Text>
        <IntInput
          value={zlp}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          Set a whores price in ZLP.
        </IntInput>
        <ButtonsWrapper>
          <ModalButton color={Colors.Info}>
            Place to breed
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
