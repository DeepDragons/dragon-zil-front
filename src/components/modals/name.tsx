import React from 'react';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { Input } from 'components/input';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonObject } from '@/lib/api';

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  dragon?: DragonObject;
  onClose: () => void;
};

let load = false;
export const NameModal: React.FC<Prop> = ({
  show,
  dragon,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dragonStage = React.useMemo(
    () => dragon && dragon.stage === 0 ? 'egg' : 'dragon',
    [dragon]
  );

  const hanldeTransfer = React.useCallback(async() => {
    setLoading(true);
    load = true;
    try {
      // await dragonZIL.transfer(bech32, id);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
    load = false;
  }, [dragon]);
  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, []);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          {dragonLocale.t('name.title')}
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
          {loading ?
            commonLocale.t('do_not_refresh') : dragonLocale.t('name.info', {
              dragonStage
            })}
        </Text>
        {loading ? null : (
          <Input
            fontColors={error ? Colors.Danger : Colors.Pink}
            placeholder={dragonLocale.t('name.placeholder')}
            border="2"
            css="text-align: center;"
          />
        )}
        <ButtonsWrapper>
          <ModalButton
            disabled={Boolean(loading || error)}
            color={Colors.Pink}
            onClick={hanldeTransfer}
          >
            {loading ? (
                <Loader
                  type="ThreeDots"
                  color={Colors.Pink}
                  height={10}
                  width={40}
                />
              ) : 'Change'}
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            disabled={loading}
            onClick={hanldeClose}
          >
            {commonLocale.t('cancel')}
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
