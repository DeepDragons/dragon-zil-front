import React from 'react';
import Loader from "react-loader-spinner";
import { useTranslation } from 'next-i18next';

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
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
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
          {dragonLocale.t('breed_modal.title')} #{id}
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
          {dragonLocale.t('breed_modal.info')}
        </Text>
        <IntInput
          value={zlp}
          min={50}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          {dragonLocale.t('breed_modal.set_price')}
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
            ) : dragonLocale.t('breed_modal.btn')}
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            onClick={onClose}
          >
            {commonLocale.t('cancel')}
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
