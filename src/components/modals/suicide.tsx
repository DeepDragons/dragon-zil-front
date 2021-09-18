import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Loader from "react-loader-spinner";

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { TextSkelet } from 'components/skelet/text';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonZIL } from 'mixin/dragon-zil';
import { GenLab } from 'mixin/gen-lab';
import { ZIlPayToken } from 'mixin/zilpay-token';
import { Necropolis } from 'mixin/necropolis';
import { Contracts } from '@/config/contracts';
import { DragonObject } from '@/lib/api';

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Prop = {
  show: boolean;
  stage: number;
  dragon: DragonObject | null;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
const zIlPayToken = new ZIlPayToken();
const genLab = new GenLab();
const necropolis = new Necropolis();
let load = false;
export const SuicideModal: React.FC<Prop> = ({
  show,
  stage,
  dragon,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [loading, setLoading] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [rewards, setRewards] = React.useState('0');

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );
  const buttonName = React.useMemo(
    () => approved ?
      dragonLocale.t('suicide_modal.btn', { dragonStage }) : dragonLocale.t('sale.btn_approve'),
    [approved, id]
  );

  const handleUpdate = React.useCallback(async() => {
    if (!id || !dragon) {
      return null;
    }
    setLoading(true);

    try {
      const isApproved = await dragonZIL.getTokenApprovals(id, Contracts.Necropolis);
      setApproved(isApproved);
    } catch {
      //
    }
    
    try {
      let {
        priceMultiplicator,
        startPrice,
        useCount
      } = await genLab.getCounter(id);
      priceMultiplicator = Number(priceMultiplicator);
      useCount = Number(useCount);
      startPrice = BigInt(String(startPrice));
      const gl = necropolis.calcGenLab(
        startPrice,
        useCount,
        priceMultiplicator
      );
      const {
        faceCurve,
        combatCurve,
        maxCurve,
        supplyCurve
      } = await necropolis.getCurve();
      const totalSupplyMain = await dragonZIL.getTokenSupply();
      const zlp = await zIlPayToken.getBalance(Contracts.Necropolis);
      const rewards = necropolis.calcRewards({
        zlp,
        combat: dragon.gen_fight,
        face: dragon.gen_image,
        tokenid: id,
        genLab: String(gl),
        max: maxCurve,
        faceCurve: faceCurve,
        combatCurve: combatCurve,
        supplyCurve: supplyCurve,
        supply: totalSupplyMain
      });
      const zlpAmount = Number(rewards) / Number(ZIlPayToken.decimal);

      setRewards(zlpAmount.toFixed(5));
    } catch {
      //
    }

    setLoading(false);
  }, [id, dragon]);
  const handleSubmit = React.useCallback(async() => {
    load = true;
    setLoading(true);
    try {
      if (approved) {
        await necropolis.burnForRewards(id);
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
    load = false;
    setLoading(false);
  }, [id]);
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
  }, [id, show]);

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
        {load ? null : loading ? (
          <TextSkelet />
        ) : (
          <Text
            fontColors={Colors.Info}
            size="32px"
            css="text-align: center;"
          >
            {rewards} $ZLP
          </Text>
        )}
        <ButtonsWrapper style={{
          width: '100%'
        }}>
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
