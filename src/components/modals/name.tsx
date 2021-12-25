import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { Input } from "components/input";
import { Colors } from "config/colors";
import { ZIlPayToken } from "mixin/zilpay-token";

import { StyleFonts } from "@/config/fonts";
import { Contracts } from "@/config/contracts";
import { NameDragons } from "@/mixin/name";
import { DragonObject } from "@/lib/api";
import { ModalTitle, ButtonsWrapper, ModalButton } from "./style";

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  dragon: DragonObject | null;
  onClose: () => void;
};

const dragonsName = new NameDragons();
const zilPayToken = new ZIlPayToken();
let load = false;
export var NameModal: React.FC<Prop> = function ({ show, dragon, onClose }) {
  const commonLocale = useTranslation(`common`);
  const dragonLocale = useTranslation(`dragon`);

  const [error, setError] = React.useState(``);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(dragon?.name || ``);
  const [changePrice, setChangePrice] = React.useState(10);
  const [needApprove, setNeedApprove] = React.useState(false);

  const dragonStage = React.useMemo(
    () => (dragon && dragon.stage === 0 ? `egg` : `dragon`),
    [dragon],
  );

  const btnText = React.useMemo(
    () => (needApprove
      ? dragonLocale.t(`name.btn_approve`)
      : dragonLocale.t(`name.btn_change`)),
    [needApprove],
  );

  const textInfo = React.useMemo(() => {
    if (loading) {
      return commonLocale.t(`do_not_refresh`);
    }
    if (needApprove) {
      return dragonLocale.t(`name.info_approve`, {
        dragonStage,
        price: String(changePrice),
      });
    }

    return dragonLocale.t(`name.info`, {
      dragonStage,
      price: String(changePrice),
    });
  }, [needApprove, loading, dragonStage, changePrice]);

  const hanldeUpdate = React.useCallback(async () => {
    setLoading(true);
    try {
      const allow = BigInt(await zilPayToken.getAllowances(Contracts.Name));
      const price = await dragonsName.getPrice();

      setChangePrice(Number(price / BigInt(ZIlPayToken.decimal)));
      setNeedApprove(allow < price);
    } catch {
      ///
    }
    setLoading(false);
  }, []);

  const hanldeChange = React.useCallback(async () => {
    if (!dragon) {
      return null;
    }

    setLoading(true);
    load = true;
    try {
      await dragonsName.setName(name, dragon.id);
      onClose();
      // if (needApprove) {
      //   await zilPayToken.increaseAllowance(Contracts.Name);
      //   setNeedApprove(false);
      // } else {
      //   await dragonsName.setName(name, dragon.id);
      //   onClose();
      // }
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
    load = false;
  }, [dragon, name]);
  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    onClose();
  }, []);

  React.useEffect(() => {
    if (dragon && show) {
      // hanldeUpdate();
    }
  }, [show, dragon]);

  return (
    <Modal
      title={(
        <ModalTitle fontVariant={StyleFonts.FiraSansBold} size="32px">
          {dragonLocale.t(`name.title`)}
        </ModalTitle>
      )}
      show={show}
      onClose={hanldeClose}
    >
      <Container>
        <Text fontColors={Colors.Muted} size="22px" css="text-align: center;">
          {textInfo}
        </Text>
        {!dragon || loading || needApprove ? null : (
          <Input
            fontColors={error ? Colors.Danger : Colors.Success}
            placeholder={dragonLocale.t(`name.placeholder`)}
            maxLength={15}
            defaultValue={name}
            border="2"
            type="text"
            css="text-align: center;"
            onInput={(e) => setName(String(e.currentTarget.value))}
          />
        )}
        <ButtonsWrapper>
          <ModalButton
            disabled={Boolean(loading || error)}
            color={needApprove ? Colors.Warning : Colors.Success}
            fontColors={Colors.Dark}
            onClick={hanldeChange}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.Darker}
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
