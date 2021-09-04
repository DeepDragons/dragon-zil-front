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
export const TransferModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [bech32, setBech32] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );

  const hanldeInputAddress = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setError('');
    setBech32(event.currentTarget.value);
  }, []);

  const hanldeTransfer = React.useCallback(async() => {
    setLoading(true);
    try {
      await dragonZIL.transfer(bech32, id);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  }, [bech32, id]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          {commonLocale.t('transfer')} #{id}
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
          {dragonLocale.t('transfer_info', { dragonStage })}
        </Text>
        <Input
          fontColors={error ? Colors.Danger : Colors.LightBlue}
          placeholder="zil1wl38cwww2u3g8wzgutxlxtxwwc0rf7jf27zace"
          border="2"
          css="text-align: center;"
          onInput={hanldeInputAddress}
        />
        <ButtonsWrapper>
          <ModalButton
            disabled={Boolean(loading || !bech32 || error)}
            onClick={hanldeTransfer}
          >
            {loading ? (
                <Loader
                  type="ThreeDots"
                  color={Colors.White}
                  height={10}
                  width={40}
                />
              ) : 'Transfer'}
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
