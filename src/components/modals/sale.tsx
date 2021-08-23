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
  stage: number;
  id: string;
  onClose: () => void;
};

export const SaleModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const [zils, setZils] = React.useState(1000);

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'eggs' : 'dragons',
    [stage]
  );

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          To sale #{id}
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
          Earn money on your {dragonStage} by trading them on the market!
        </Text>
        <IntInput
          value={zils}
          bg={Colors.Dark}
          onInput={setZils}
        >
          Set a price in ZILs
        </IntInput>
        <ButtonsWrapper>
          <ModalButton>
            Sale
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