import Loader from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import React from "react";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { useStore } from "effector-react";
import { IntInput } from "components/int-input";

import { Colors } from "config/colors";
import { ZIlPayToken } from "mixin/zilpay-token";
import { FigthPlace } from "mixin/fight-place";
import { $wallet } from "store/wallet";
import { Contracts } from "@/config/contracts";
import { StyleFonts } from "@/config/fonts";
import {
  ModalTitle, ButtonsWrapper, ModalButton, Container,
} from "./style";

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const zilPayToken = new ZIlPayToken();
const figthPlace = new FigthPlace();
let load = false;
export var FightsModal: React.FC<Prop> = function ({ show, id, onClose }) {
  const commonLocale = useTranslation(`common`);
  const dragonLocale = useTranslation(`dragon`);
  const address = useStore($wallet);
  const [loading, setLoading] = React.useState(true);
  const [zlp, setZLP] = React.useState(500);
  const [needApprove, setNeedApprove] = React.useState(true);

  const btnText = React.useMemo(
    () => (needApprove
      ? dragonLocale.t(`fights_modal.btn_approve`)
      : dragonLocale.t(`fights_modal.btn_start`)),
    [needApprove],
  );

  const hanldeUpdate = React.useCallback(async () => {
    setLoading(true);
    try {
      const allow = await zilPayToken.getAllowances(Contracts.FightPlace);
      const bigValue = BigInt(zlp.toFixed()) * BigInt(ZIlPayToken.decimal);
      setNeedApprove(!zilPayToken.isAllow(String(bigValue), allow));
    } catch {
      ///
    }
    setLoading(false);
  }, [zlp]);

  const hanldeSubmit = React.useCallback(async () => {
    setLoading(true);
    load = true;
    try {
      if (needApprove) {
        await zilPayToken.increaseAllowance(Contracts.FightPlace);
        setNeedApprove(false);
      } else {
        await figthPlace.place(id, zlp, false);
        onClose();
      }
    } catch {
      //
    }
    setLoading(false);
    load = false;
  }, [needApprove, id, zlp]);

  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, []);

  React.useEffect(() => {
    if (address && show) {
      hanldeUpdate();
    }
  }, [address, show]);

  return (
    <Modal
      title={(
        <ModalTitle fontVariant={StyleFonts.FiraSansBold} size="32px">
          {dragonLocale.t(`fights_modal.title`)}
          {` `}
          #
          {id}
        </ModalTitle>
      )}
      show={show}
      onClose={hanldeClose}
    >
      <Container>
        <Text fontColors={Colors.Muted} size="22px" css="text-align: center;">
          {loading
            ? commonLocale.t(`do_not_refresh`)
            : dragonLocale.t(`fights_modal.info`)}
        </Text>
        {!loading ? (
          <IntInput value={zlp} bg={Colors.Dark} onInput={setZLP}>
            {dragonLocale.t(`fights_modal.set_price`)}
          </IntInput>
        ) : null}
        <ButtonsWrapper>
          <ModalButton
            color={needApprove ? Colors.Warning : Colors.Info}
            disabled={loading}
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
            ) : (
              btnText
            )}
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            disabled={loading}
            onClick={hanldeClose}
          >
            {commonLocale.t(`cancel`)}
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
