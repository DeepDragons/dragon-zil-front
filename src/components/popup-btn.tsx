import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

type Prop = {
  from: number;
  to: number;
  onChange: (from: number, to: number) => void;
  onApply: () => void;
};

type ItemProp = {
  last: boolean;
};

type MenuProp = {
  open: boolean;
};

const Container = styled.div`
  cursor: pointer;
  
  background: ${Colors.Darker};
  padding: 5px 46px;

  min-width: 60px;

  user-select: none;
  text-align: center;

  border-radius: 16px;
  margin: 5px;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  position: absolute;
  display: ${(p: MenuProp) => p.open ? 'block' : 'none'};
  z-index: 20;

  border-radius: 16px;
  padding: 16px;
  min-width: 291px;
  min-height: 175px;
  transform: translate(0, 74px);

  background: ${Colors.Darker};
`;
const Apply = styled.div`
  cursor: pointer;
  text-align: center;

  border-radius: 8px;
  padding: 14px 83px;

  color: ${Colors.White};
  background: ${Colors.Blue};
  font-family: ${StyleFonts.FiraSansSemiBold};
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
const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70px;
  min-height: 129px;
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

export const PopUpButton: React.FC<Prop> = ({
  children,
  from,
  to,
  onChange,
  onApply
}) => {
  const [opned, SetOpened] = React.useState(false);

  return (
    <React.Fragment>
      {opned ? (
        <Closer onClick={() => SetOpened(false)}/>
      ) : null}
      <Container onClick={() => SetOpened(true)}>
        <Text fontVariant={StyleFonts.FiraSansMedium}>
          {children}
        </Text>
      </Container>
      <Menu open={opned}>
        <MenuWrapper>
          <Column>
            <Text
              fontVariant={StyleFonts.FiraSansMedium}
              fontColors={Colors.Muted}
            >
              From
            </Text>
            <Input
              defaultValue={from}
              type="number"
              min="0"
              onInput={(event) => onChange(Number(event.currentTarget.value), to)}
            />
          </Column>
          <Text size="40px">
            -
          </Text>
          <Column>
            <Text
              fontVariant={StyleFonts.FiraSansMedium}
              fontColors={Colors.Muted}
            >
              To
            </Text>
            <Input
              defaultValue={to}
              type="number"
              min="0"
              onInput={(event) => onChange(from, Number(event.currentTarget.value))}
            />
          </Column>
        </MenuWrapper>
        <Apply onClick={onApply}>
          Apply
        </Apply>
      </Menu>
    </React.Fragment>
  );
};
