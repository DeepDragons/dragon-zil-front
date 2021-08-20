import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  elements: JSX.Element[];
  selected: number;
  onSelected: (index: number) => void
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: inherit;

  background: ${Colors.Darker};
  border-radius: 16px;
  padding: 5px;
  min-width: 250px;
`;
const Li = styled.li`
  cursor: pointer;
  padding: 10px 40px;
  width: fit-content;

  border-radius: 16px;
  border: 1px solid ${
    (p: { selected: boolean }) => p.selected ? Colors.White : 'transparent'
  };
`;
export const Tab: React.FC<Prop> = ({
  children,
  elements,
  selected,
  onSelected
}) => {
  return (
    <Container>
      <Text>
        {children}
      </Text>
      <Ul>
        {elements.map((el, index) => (
          <Li
            key={index}
            selected={index === selected}
            onClick={() => onSelected(index)}
          >
            {el}
          </Li>
        ))}
      </Ul>
    </Container>
  );
};
