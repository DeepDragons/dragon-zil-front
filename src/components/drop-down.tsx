import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';

type Prop = {
  items: string[];
  selected: number;
  open: boolean;
  onClose: () => void;
  onShow: () => void;
  onSelected: (index: number) => void;
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
  z-index: 20;
  padding: 8px;
  min-width: 150px;

  user-select: none;
  text-align: center;

  border-radius: ${(p: MenuProp) => p.open ? ' 16px 16px 0 0' : '16px'};
`;
const Menu = styled.ul`
  position: absolute;
  display: ${(p: MenuProp) => p.open ? 'block' : 'none'};
  z-index: 20;
  transform: translate(-5%,2%);
`;
const Item = styled.li`
  cursor: pointer;
  background: ${Colors.Darker};
  z-index: 20;
  padding: 8px;
  text-align: center;
  width: fit-content;

  user-select: none;

  ${(p: ItemProp) => p.last ? 'border-radius: 0px 0px 16px 16px;' : ''}
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

export const DropDown: React.FC<Prop> = ({
  items,
  selected,
  open,
  onSelected,
  onShow,
  onClose
}) => {
  const refContainer = React.useRef<HTMLDivElement | null>();

  const handleOpen = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (open) {
      onClose();
    } else {
      onShow();
    }
  }, [open]);
  const hanldeSelect = (index: number) => {
    onClose();
    onSelected(index);
  };

  return (
    <React.Fragment>
      {open ? (
        <Closer onClick={onClose}/>
      ) : null}
      <Container
        open={open}
        ref={(n) => refContainer.current = n}
        onClick={handleOpen}
      >
        <Text size="17px">
          {items[selected]}
        </Text>
        <Menu open={open}>
          {items.map((el, index) => (
            <Item
              key={index}
              last={index === items.length - 1}
              style={{
                width: refContainer.current?.clientWidth
              }}
              onClick={() => hanldeSelect(index)}
            >
              <Text size="17px">
                {el}
              </Text>
            </Item>
          ))}
        </Menu>
      </Container>
    </React.Fragment>
  );
};
