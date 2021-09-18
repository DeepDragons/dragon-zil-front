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
import { Contracts } from '@/config/contracts';

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
let load = false;
export const SuicideModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [loading, setLoading] = React.useState(false);
  const [approved, setApproved] = React.useState(false);

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );
  const buttonName = React.useMemo(
    () => approved ?
      dragonLocale.t('suicide_modal.btn', { dragonStage }) : dragonLocale.t('sale.btn_approve'),
    [approved, id]
  );

  const hanldeUpdateApprovals = React.useCallback(async() => {
    setLoading(true);
    if (id) {
      const isApproved = await dragonZIL.getTokenApprovals(id, Contracts.Necropolis);

      setApproved(isApproved);
      setLoading(false);

      return isApproved;
    }
    setLoading(false);

    return false;
  }, [id]);
  const handleSubmit = React.useCallback(async() => {
    load = true;
    setLoading(true);
    try {
      if (approved) {
        // await market.sell(id, zils);
        setLoading(false);
        load = false;
        onClose();
      } else {
        await dragonZIL.setApprove(id, Contracts.Necropolis);
        setApproved(true);
        setLoading(false);
        load = false;
      }
      onClose();
    } catch {
      ///
    }
    setLoading(false);
    load = false;
  }, [id]);
  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, []);

  React.useEffect(() => {
    hanldeUpdateApprovals();
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
      onClose={hanldeClose}
    >
      <Container>
        <Text
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          {loading
            ? commonLocale.t('do_not_refresh') : dragonLocale.t('suicide_modal.info', { dragonStage })}
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={approved ? Colors.Primary : Colors.Warning}
            fontColors={approved ? Colors.White : Colors.Dark}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : buttonName}
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            disabled={loading}
            onClick={hanldeClose}
          >
            {commonLocale.t('cancel')}
          </ModalButton>
        </ButtonsWrapper>
        {loading && load ? null : (
          <Text
            fontColors={Colors.Muted}
            size="16px"
            css="text-align: center;"
          >
            {dragonLocale.t('suicide_modal.info0')}
          </Text>
        )}
      </Container>
    </Modal>
  );
};
