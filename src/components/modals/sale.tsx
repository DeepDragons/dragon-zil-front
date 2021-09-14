import React from 'react';

import { Modal } from 'components/modal';
import Loader from "react-loader-spinner";
import { Text } from 'components/text';
import { useTranslation } from 'next-i18next';
import { IntInput } from 'components/int-input';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonZIL } from 'mixin/dragon-zil';
import { MarketPlace } from 'mixin/market-place';
import { Contracts } from '@/config/contracts';

type Prop = {
  show: boolean;
  stage: number;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
const market = new MarketPlace();
export const SaleModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const commonLocale = useTranslation('common');
  const dragonLocale = useTranslation('dragon');
  const [zils, setZils] = React.useState(1000);
  const [approved, setApproved] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'eggs' : 'dragons',
    [stage]
  );

  const buttonName = React.useMemo(
    () => approved ? dragonLocale.t('sale.btn_sale') : dragonLocale.t('sale.btn_approve'),
    [approved, id]
  );

  const hanldeUpdateApprovals = React.useCallback(async() => {
    setLoading(true);
    if (id) {
      const isApproved = await dragonZIL.getTokenApprovals(id, Contracts.MarketPlace);

      setApproved(isApproved);
      setLoading(false);

      return isApproved;
    }
    setLoading(false);

    return false;
  }, [id]);
  const handleSubmit = React.useCallback(async() => {
    setLoading(true);
    try {
      if (approved) {
        await market.sell(id, zils);
        setLoading(false);
        onClose();
      } else {
        await dragonZIL.setApprove(id, Contracts.MarketPlace);
        setApproved(true);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, [id, approved, zils]);

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
          {dragonLocale.t('sale.title')} #{id}
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
          {dragonLocale.t('sale.info', {dragonStage})}
        </Text>
        <IntInput
          value={zils}
          bg={Colors.Dark}
          onInput={setZils}
        >
          {dragonLocale.t('sale.set_price')}
        </IntInput>
        <ButtonsWrapper>
          <ModalButton
            disabled={loading}
            color={approved ? Colors.Primary : Colors.Warning}
            fontColors={approved ? Colors.White : Colors.Dark}
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
            onClick={onClose}
          >
            {commonLocale.t('cancel')}
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
