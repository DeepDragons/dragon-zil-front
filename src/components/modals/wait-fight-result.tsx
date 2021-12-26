import React from "react";
import Loader from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import { useStore } from "effector-react";

import { Modal } from "components/modal";
import { Text } from "components/text";
import { Card } from "components/card";
import { SkeletCard } from "components/skelet/card";
import { Colors } from "config/colors";
import { ZIlPayToken } from "mixin/zilpay-token";

import { StyleFonts } from "@/config/fonts";
import { $arena, resetArena } from "@/store/arena";
import { DragonObject, DragonAPI } from "@/lib/api";
import {
  ModalTitle, ButtonsWrapper, ModalButton, Container,
} from "./style";

type Prop = {
  show: boolean;
  defended: DragonObject;
  onClose: () => void;
};

const backend = new DragonAPI();
let load = true;
export var WaitFightModal: React.FC<Prop> = function ({ show, onClose }) {
  const arenaLocale = useTranslation(`arena`);
  const commonLocale = useTranslation(`common`);

  const arena = useStore($arena);

  const [loading, setLoading] = React.useState(true);
  const [winner, setWinner] = React.useState<DragonObject>();

  const isWon = React.useMemo(
    () => arena && arena.who === arena.winner,
    [arena],
  );
  const wonAmount = React.useMemo(() => {
    let value = BigInt(0);
    const result = isWon ? `+` : `-`;
    if (arena && arena.amount) {
      value = BigInt(arena.amount) / BigInt(ZIlPayToken.decimal);
    }

    return `${result} ${Number(value)} $ZLP`;
  }, [arena, isWon]);

  const hanldeClose = React.useCallback(() => {
    if (load) {
      return null;
    }

    resetArena();
    setLoading(true);
    onClose();
    load = true;
  }, [onClose]);

  React.useEffect(() => {
    if (arena && arena.winner) {
      setLoading(false);
      load = false;
      backend.getDragon(String(arena.winner)).then((d) => {
        if (d) {
          setWinner(d);
        }
      });
    }
  }, [arena]);

  return (
    <Modal
      title={(
        <ModalTitle fontVariant={StyleFonts.FiraSansBold} size="32px">
          {loading
            ? arenaLocale.t(`modal.title0`)
            : arenaLocale.t(`modal.title1`, {
              win: arena?.winner || 0,
            })}
        </ModalTitle>
      )}
      show={show}
      onClose={hanldeClose}
    >
      <Container>
        {loading ? (
          <Text fontColors={Colors.Muted} size="22px" css="text-align: center;">
            {commonLocale.t(`do_not_refresh`)}
            <Loader
              type="Puff"
              color={Colors.LightBlue}
              height={50}
              width={50}
            />
          </Text>
        ) : null}
        {Boolean(!loading) && Boolean(!winner) ? <SkeletCard /> : null}
        {winner ? (
          <Card dragon={winner}>
            <Text fontColors={Colors.Primary}>
              #
              {winner.id}
              {` `}
              Won,
              {` `}
              <b
                style={{
                  color: isWon ? Colors.Success : Colors.Danger,
                }}
              >
                {` `}
                {commonLocale.t(`you`)}
                {` `}
                {wonAmount}
              </b>
            </Text>
          </Card>
        ) : null}
        <ButtonsWrapper>
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
