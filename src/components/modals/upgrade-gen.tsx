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
import { ZIlPayToken } from 'mixin/zilpay-token';
import { Contracts } from '@/config/contracts';

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

const zilPayToken = new ZIlPayToken();
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
  const [needApprove, setNeedApprove] = React.useState(true);

  const hanldeUpdate = React.useCallback(async() => {
    setLoading(true);
    try {
      const allow = await zilPayToken.getAllowances(Contracts.GenLab);
      const bigValue = BigInt(Number(price).toFixed()) * BigInt(ZIlPayToken.decimal);
      setNeedApprove(!zilPayToken.isAllow(String(bigValue), allow));
    } catch {
      ///
    }
    setLoading(false);
  }, [price]);

  const handleUpgrade = React.useCallback(async() => {
    setLoading(true);
    try {
      if (needApprove) {
        await zilPayToken.increaseAllowance(Contracts.GenLab);
        setNeedApprove(false);
      } else {
        await genLab.changeGen(id, gen.gen);
        onClose();
      }
    } catch {
      ///
    }
    setLoading(false);
  }, [id, gen, needApprove]);

  React.useEffect(() => {
    if (show) {
      hanldeUpdate();
    }
  }, [show]);

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
            color={needApprove ? Colors.Warning : Colors.Success}
            fontColors={needApprove ? Colors.Black : Colors.White}
            disabled={loading}
            onClick={handleUpgrade}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={needApprove ? Colors.Black : Colors.White}
                height={10}
                width={40}
              />
            ) : needApprove ? mutateLocale.t('approve') : mutateLocale.t('upgrade_btn')}
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
