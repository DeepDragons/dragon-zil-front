import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { useTranslation } from "next-i18next";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { Colors } from "config/colors";
import { DragonZIL } from "mixin/dragon-zil";
import { StyleFonts } from "@/config/fonts";
import { ModalTitle, ButtonsWrapper, ModalButton } from "./style";

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
export var HatchEggModal: React.FC<Prop> = function ({ show, id, onClose }) {
  const commonLocale = useTranslation(`common`);
  const dragonLocale = useTranslation(`dragon`);
  const [loading, setLoading] = React.useState(false);

  const handleHatch = React.useCallback(async () => {
    setLoading(true);
    try {
      await dragonZIL.hatchEgg(id);
      onClose();
    } catch {
      ///
    }
    setLoading(false);
  }, [id]);

  return (
    <Modal
      title={(
        <ModalTitle fontVariant={StyleFonts.FiraSansBold} size="32px">
          {dragonLocale.t(`hatch_egg.title`)}
          {` `}
          #
          {id}
        </ModalTitle>
      )}
      show={show}
      onClose={onClose}
    >
      <Container>
        <Text fontColors={Colors.Muted} size="22px" css="text-align: center;">
          {dragonLocale.t(`hatch_egg.info`)}
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Pink}
            fontColors={Colors.White}
            onClick={handleHatch}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : (
              dragonLocale.t(`hatch_egg.btn`)
            )}
          </ModalButton>
          <ModalButton color={Colors.Dark} onClick={onClose}>
            {commonLocale.t(`cancel`)}
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
