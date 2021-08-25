import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonZIL } from 'mixin/dragon-zil';

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
export const HatchEggModal: React.FC<Prop> = ({
  show,
  id,
  onClose
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleHatch = React.useCallback(async() => {
    setLoading(true);
    try {
      await dragonZIL.hatchEgg(id);
      onClose();
    } catch {
      ///
    }
    setLoading(false);
  }, [id]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          Hatch an egg #{id}
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
          You can hatch an egg for become a dragon.
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Pink}
            fontColors={Colors.White}
            onClick={handleHatch}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : 'Hatch an egg.'}
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
