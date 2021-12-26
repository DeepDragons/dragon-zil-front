import Loader from "react-loader-spinner";
import Image from 'next/image';
import { useTranslation } from "next-i18next";
import React from "react";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { useStore } from "effector-react";

import { Colors } from "config/colors";
import { ZIlPayToken } from "mixin/zilpay-token";
import { FigthPlace } from "mixin/fight-place";
import { $wallet } from "store/wallet";
import { Contracts } from "@/config/contracts";
import { StyleFonts } from "@/config/fonts";
import {
  ModalTitle, ButtonsWrapper, ModalButton, Container,
} from "./style";

import { Blockchain } from 'mixin/custom-fetch';

type Prop = {
  show: boolean;
  id: string;
  wound: number;
  onClose: () => void;
};

const zilPayToken = new ZIlPayToken();
const figthPlace = new FigthPlace();
const blockchain = new Blockchain();
let load = false;
export var HealModal: React.FC<Prop> = function ({ show, id, wound, onClose }) {
  const commonLocale = useTranslation(`common`);
  const dragonLocale = useTranslation(`dragon`);
  const address = useStore($wallet);
  const [loading, setLoading] = React.useState(true);
  const [zlp, setZLP] = React.useState(10);
  const [needApprove, setNeedApprove] = React.useState(true);

  const btnText = React.useMemo(
    () => (needApprove
      ? dragonLocale.t(`heal_modal.btn_approve`)
      : dragonLocale.t(`heal_modal.btn_start`)),
    [needApprove],
  );

  const hanldeUpdate = React.useCallback(async () => {
    setLoading(true);
    try {
      const { allowances, price } = await blockchain.fetchForHeal();
      setZLP(Number((Number(price) / Number(ZIlPayToken.decimal)).toFixed()));
      setNeedApprove(!zilPayToken.isAllow(price, allowances));
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
        await figthPlace.healWound(id, wound);
        onClose();
      }
    } catch {
      //
    }
    setLoading(false);
    load = false;
  }, [needApprove, id, wound]);

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
          <Image
            src={`/imgs/wounds/${wound}.jpg`}
            alt="wound img"
            className="wound-img"
            height="25"
            width="25"
          />
          {` `}
          {dragonLocale.t(`heal_modal.title`)}
        </ModalTitle>
      )}
      show={show}
      onClose={hanldeClose}
    >
      <Container>
        <Text fontColors={Colors.Muted} size="22px" css="text-align: center;">
          {loading
            ? commonLocale.t(`do_not_refresh`)
            : dragonLocale.t(`heal_modal.info`, {
              zlp
            })}
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={needApprove ? Colors.Warning : Colors.Success}
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
