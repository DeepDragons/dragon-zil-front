import React from 'react';
import Loader from "react-loader-spinner";

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { IntInput } from 'components/int-input';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { BreedPlace } from 'mixin/breed';

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const breedPlace = new BreedPlace();
export const BreedModal: React.FC<Prop> = ({
  show,
  id,
  onClose
}) => {
  const [zlp, setZLP] = React.useState(50);
  const [loading, setLoading] = React.useState(false);

  const handlePlace = React.useCallback(async() => {
    setLoading(true);
    try {
      await breedPlace.add(id, zlp);
      onClose();
    } catch {
      //
    }
    setLoading(false);
  }, [id, zlp]);

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
          Set a price and put your dragon (token) on a marketplace, where other players can pay you to mate their dragons with yours.
        </Text>
        <IntInput
          value={zlp}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          Set a whores price in ZLP.
        </IntInput>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Info}
            disabled={loading}
            onClick={handlePlace}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : 'Place to breed'}
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
