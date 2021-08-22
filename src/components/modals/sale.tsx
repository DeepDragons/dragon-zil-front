import React from 'react';
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { Input } from 'components/input';
import { IntInput } from 'components/int-input';
import { Button } from 'components/button';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { ModalTitle, ButtonsWrapper } from './style';

const Container = styled.div`
  padding: 24px;

  .int-input {
    width: 100%;
  }
`;

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
          Set a price
        </IntInput>
        <ButtonsWrapper>
          <Button css="min-width: 200px;margin: 8px;padding: 22px;">
            Sale
          </Button>
          <Button
            color={Colors.Dark}
            css="min-width: 200px;margin: 8px;padding: 22px;"
            onClick={onClose}
          >
            Cancel
          </Button>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
