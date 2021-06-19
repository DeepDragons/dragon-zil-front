import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from '@/config/colors';

type Prop = {
  items: string[];
  selected: number;
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
  padding: 5px 46px;

  min-width: 60px;

  user-select: none;
  text-align: center;

  border-radius: ${(p: MenuProp) => p.open ? ' 16px 16px 0 0' : '16px'};
`;
const Menu = styled.ul`
  position: absolute;
  display: ${(p: MenuProp) => p.open ? 'block' : 'none'};
  z-index: 20;
  transform: translate(0,67%);
`;
const Item = styled.li`
  cursor: pointer;
  background: ${Colors.Darker};
  z-index: 20;
  padding: 5px 46px;
  min-width: 60px;
  text-align: center;

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
  onSelected
}) => {
  const [opned, SetOpened] = React.useState(false);
  
  const hanldeSelect = React.useCallback((index: number) => {
    onSelected(index);
    SetOpened(false);
  }, []);

  return (
    <React.Fragment>
      {opned ? (
        <Closer onClick={() => SetOpened(false)}/>
      ) : null}
      <Container
        open={opned}
        onClick={() => SetOpened(true)}
      >
        <Text>
          {items[selected]}
        </Text>
      </Container>
      <Menu open={opned}>
        {items.map((el, index) => (
          <Item
            key={index}
            last={index === items.length - 1}
            onClick={() => hanldeSelect(index)}
          >
            <Text>
              {el}
            </Text>
          </Item>
        ))}
      </Menu>
    </React.Fragment>
  );
};
