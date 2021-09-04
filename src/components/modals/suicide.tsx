import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
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
  stage: number;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
export const SuicideModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [loading, setLoading] = React.useState(false);

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );

  const handleSuicide = React.useCallback(async() => {
    setLoading(true);
    try {
      await dragonZIL.burn(id);
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
          {dragonLocale.t('suicide_modal.title')} #{id}
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
          {dragonLocale.t('suicide_modal.info', { dragonStage })}
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Danger}
            disabled={loading}
            onClick={handleSuicide}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : dragonLocale.t('suicide_modal.btn', { dragonStage })}
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
