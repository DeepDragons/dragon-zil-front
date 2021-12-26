import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { useTranslation } from "next-i18next";

import { Modal } from "components/modal";
import { Text } from "components/text";

import { Colors } from "config/colors";
import { GenLab } from "mixin/gen-lab";
import { ZIlPayToken } from "mixin/zilpay-token";
import { StyleFonts } from "@/config/fonts";
import { Contracts } from "@/config/contracts";
import { ModalTitle, ButtonsWrapper, ModalButton } from "./style";

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
let load = false;
export var UpgradeGenModal: React.FC<Prop> = function ({
  show,
  gen,
  id,
  price,
  onClose,
}) {
  const mutateLocale = useTranslation(`mutate`);
  const commonLocale = useTranslation(`common`);
  const [loading, setLoading] = React.useState(false);
  const [needApprove, setNeedApprove] = React.useState(true);

  const hanldeUpdate = React.useCallback(async () => {
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

  const handleUpgrade = React.useCallback(async () => {
    setLoading(true);
    load = true;
    try {
      if (needApprove) {
        await zilPayToken.increaseAllowance(Contracts.GenLab);
        setNeedApprove(false);
        load = false;
      } else {
        await genLab.changeGen(id, gen.gen);
        onClose();
      }
    } catch {
      ///
    }
    load = false;
    setLoading(false);
  }, [id, gen, needApprove, onClose]);
  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (show) {
      hanldeUpdate();
    }
  }, [show, hanldeUpdate]);

  return (
    <Modal
      title={(
        <ModalTitle fontVariant={StyleFonts.FiraSansBold} size="32px">
          {mutateLocale.t(`upgrade_btn`)}
          {` `}
          #
          {id}
        </ModalTitle>
      )}
      show={show}
      onClose={hanldeClose}
    >
      <Container>
        <Description
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          {loading
            ? commonLocale.t(`do_not_refresh`)
            : mutateLocale.t(`modal_sub_title`)}
        </Description>
        <br />
        {loading ? null : (
          <>
            <Description fontColors={Colors.Muted} size="19px" css="margin: 0;">
              {mutateLocale.t(`gen_index`)}
              :
              <span>{gen.gen + 1}</span>
            </Description>
            <Description fontColors={Colors.Muted} size="19px" css="margin: 0;">
              {mutateLocale.t(`current_gen`)}
              :
              <span>{gen.value}</span>
            </Description>
            <Description fontColors={Colors.Muted} size="19px" css="margin: 0;">
              {commonLocale.t(`price`)}
              :
              <span>
                {price}
                {` `}
                $ZLP
              </span>
            </Description>
          </>
        )}
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
            ) : needApprove ? (
              mutateLocale.t(`approve`)
            ) : (
              mutateLocale.t(`upgrade_btn`)
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
