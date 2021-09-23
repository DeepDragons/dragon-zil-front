import React from 'react';
import Loader from "react-loader-spinner";
import { useTranslation } from 'next-i18next';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { BreedPlace } from 'mixin/breed';
import { ZIlPayToken } from '@/mixin/zilpay-token';

type Prop = {
  show: boolean;
  id: string;
  faceCounter: number;
  combatGenes: number[];
  onClose: () => void;
};

const breedPlace = new BreedPlace();
let load = false;
export const BreedModal: React.FC<Prop> = ({
  show,
  id,
  faceCounter,
  combatGenes,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  
  const handleUpdate = React.useCallback(() => {
    let combatCounter = 0;

    for (let index = 0; index < combatGenes.length; index++) {
      const element = combatGenes[index];

      combatCounter += Number(element);
    }

    console.log(faceCounter + (combatCounter / 2));

    const value =  faceCounter + (combatCounter / 2);
    const rounded = Math.round(value);

    setPrice(Number((BigInt('500000000000000000') * BigInt(rounded)) / BigInt(ZIlPayToken.decimal)));
  }, [combatGenes, faceCounter]);
  const handlePlace = React.useCallback(async() => {
    load = true;
    setLoading(true);
    try {
      await breedPlace.add(id, price);
      onClose();
    } catch {
      //
    }
    load = false;
    setLoading(false);
  }, [id, price]);

  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, []);

  React.useEffect(() => {
    if (show) {
      handleUpdate();
    }
  }, [show]);

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
      onClose={hanldeClose}
    >
      <Container>
        <Text
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          {loading ? commonLocale.t('do_not_refresh') : dragonLocale.t('breed_modal.info', { price })}
        </Text>
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
            disabled={loading}
            onClick={hanldeClose}
          >
            {commonLocale.t('cancel')}
          </ModalButton>
        </ButtonsWrapper>
        {load ? null : (
          <Text
            fontColors={Colors.Muted}
            size="16px"
            css="text-align: center;"
          >
            The price is based on the rarity and combat effectiveness of your dragon!
          </Text>
        )}
      </Container>
    </Modal>
  );
};
