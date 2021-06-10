import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  elements: string[];
  selected: number;
  onSelected: (index: number) => void
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
const Ul = styled.ul`
  display: flex;
  align-items: center;

  background: ${Colors.Darker};
  border-radius: 16px;
  padding: 5px;
`;
const Li = styled.li`
  cursor: pointer;
  padding: 20px 40px;

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
            <Text
              fontVariant={StyleFonts.FiraSansSemiBold}
            >
              {el}
            </Text>
          </Li>
        ))}
      </Ul>
    </Container>
  );
};
