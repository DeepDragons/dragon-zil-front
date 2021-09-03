import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";
import { useTranslation } from 'next-i18next';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { GenLab } from 'mixin/gen-lab';

const Container = styled.div`
  padding: 24px;
`;
const Description = styled(Text)`
  span {
    color: ${Colors.Success};
  }
`;

type Prop = {
  show: boolean;
  id: string;
  gen: {
    gen: number;
    value: number;
    name: string;
  };
  price: number | string;
  onClose: () => void;
};

const genLab = new GenLab();
export const UpgradeGenModal: React.FC<Prop> = ({
  show,
  gen,
  id,
  price,
  onClose
}) => {
  const mutateLocale = useTranslation('mutate');
  const commonLocale = useTranslation('common');
  const [loading, setLoading] = React.useState(false);

  const handleUpgrade = React.useCallback(async() => {
    setLoading(true);
    try {
      await genLab.changeGen(id, gen.gen);
      onClose();
    } catch {
      ///
    }
    setLoading(false);
  }, [id, gen]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          {mutateLocale.t('upgrade_btn')} #{id}
        </ModalTitle>
      )}
      show={show}
      onClose={onClose}
    >
      <Container>
        <Description
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          {mutateLocale.t('modal_sub_title')}
        </Description>
        <br />
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          {mutateLocale.t('gen_index')}: <span>{gen.gen + 1}</span>
        </Description>
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          {mutateLocale.t('current_gen')}: <span>{gen.value}</span>
        </Description>
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          {commonLocale.t('price')}: <span>{price} $ZLP</span>
        </Description>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Success}
            disabled={loading}
            onClick={handleUpgrade}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : mutateLocale.t('upgrade_btn')}
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
