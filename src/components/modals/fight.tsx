import Loader from "react-loader-spinner";
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { useStore } from 'effector-react';
import { IntInput } from 'components/int-input';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { ZIlPayToken } from 'mixin/zilpay-token';
import { FigthPlace } from 'mixin/fight-place';
import { Contracts } from '@/config/contracts';
import { $wallet } from 'store/wallet';

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const zilPayToken = new ZIlPayToken();
const figthPlace = new FigthPlace();
export const FightsModal: React.FC<Prop> = ({
  show,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const address = useStore($wallet);
  const [loading, setLoading] = React.useState(true);
  const [zlp, setZLP] = React.useState(500);
  const [needApprove, setNeedApprove] = React.useState(true);

  const btnText = React.useMemo(() => {
    return needApprove ?
      dragonLocale.t('fights_modal.btn_approve') : dragonLocale.t('fights_modal.btn_start');
  }, [needApprove]);

  const hanldeUpdate = React.useCallback(async() => {
    setLoading(true);
    try {
      const allow = await zilPayToken.getAllowances(Contracts.FightPlace);
      setNeedApprove(await zilPayToken.calcAllowances(zlp, allow));
    } catch {
      ///
    }
    setLoading(false);
  }, [zlp]);

  const hanldeSubmit = React.useCallback(async() => {
    setLoading(true);
    if (needApprove) {
      await zilPayToken.increaseAllowance(Contracts.FightPlace);
    } else {
      await figthPlace.place(id, zlp, false);
      onClose();
    }
    setLoading(false);
  }, [needApprove, id, zlp]);

  React.useEffect(() => {
    if (address) {
      hanldeUpdate();
    }
  }, [address]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          {dragonLocale.t('fights_modal.title')} #{id}
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
          {dragonLocale.t('fights_modal.info')}
        </Text>
        <IntInput
          value={zlp}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          {dragonLocale.t('fights_modal.set_price')}
        </IntInput>
        <ButtonsWrapper>
          <ModalButton
            color={needApprove ? Colors.Warning : Colors.Info}
            fontColors={needApprove ? Colors.Dark : Colors.White}
            onClick={hanldeSubmit}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={needApprove ? Colors.Dark : Colors.White}
                height={10}
                width={40}
              />
            ) : btnText}
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
