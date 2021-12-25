import React from "react";
import styled from "styled-components";

import { Text } from "components/text";
import { Button } from "components/button";

import { useTranslation } from "next-i18next";
import { Colors } from "@/config/colors";
import { StyleFonts } from "@/config/fonts";

type Prop = {
  onApply: (from: number, to: number) => void;
};

type MenuProp = {
  open: boolean;
};

const Container = styled.div`
  cursor: pointer;
  background: ${Colors.Darker};
  padding: 5px;

  min-width: 60px;
  width: 144px;

  user-select: none;
  text-align: center;

  border-radius: 16px;
  margin: 5px;

  :hover {
    border: 1px solid ${Colors.Muted};
  }
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  position: absolute;
  display: ${(p: MenuProp) => (p.open ? `block` : `none`)};
  z-index: 20;

  border-radius: 16px;
  padding: 16px;
  min-width: 291px;
  min-height: 175px;
  transform: translate(-52%, -26%);

  background: ${Colors.Darker};

  @media (max-width: 500px) {
    min-width: 280px;
  }
`;
const Closer = styled.a`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background: #00000052;
`;
const MenuWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70px;
  min-height: 129px;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  background: transparent;
  border: 1px solid ${Colors.Muted};

  font-family: ${StyleFonts.FiraSansRegular};

  outline: none;
  color: ${Colors.Muted};
  font-size: 20px;
  text-align: center;
  border-radius: 8px;
  padding: 5px;
`;

export var PopUpButton: React.FC<Prop> = function ({ children, onApply }) {
  const commonLocale = useTranslation(`common`);
  const [opned, setOpened] = React.useState(false);
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(0);

  const disabled = React.useMemo(
    () => from > to || (from === 0 && to === 0),
    [from, to, opned],
  );

  const handleApply = React.useCallback(
    (event) => {
      event.preventDefault();
      setOpened(false);
      onApply(from, to);
    },
    [from, to],
  );

  return (
    <>
      {opned ? <Closer onClick={() => setOpened(false)} /> : null}
      <Container onClick={() => setOpened(true)}>
        <Text fontVariant={StyleFonts.FiraSansMedium}>{children}</Text>
        <Menu open={opned}>
          <MenuWrapper onSubmit={handleApply}>
            <Row>
              <Column>
                <Text
                  fontVariant={StyleFonts.FiraSansMedium}
                  fontColors={Colors.Muted}
                >
                  {commonLocale.t(`from`)}
                </Text>
                <Input
                  defaultValue={from}
                  type="number"
                  min="0"
                  onInput={(event) => setFrom(Number(event.currentTarget.value))}
                />
              </Column>
              <Text size="40px">-</Text>
              <Column>
                <Text
                  fontVariant={StyleFonts.FiraSansMedium}
                  fontColors={Colors.Muted}
                >
                  {commonLocale.t(`to`)}
                </Text>
                <Input
                  defaultValue={to}
                  type="number"
                  min="0"
                  onInput={(event) => setTo(Number(event.currentTarget.value))}
                />
              </Column>
            </Row>
            <Button
              color={Colors.Success}
              disabled={disabled}
              css="width: 100%;"
            >
              {commonLocale.t(`apply`)}
            </Button>
          </MenuWrapper>
        </Menu>
      </Container>
    </>
  );
};
