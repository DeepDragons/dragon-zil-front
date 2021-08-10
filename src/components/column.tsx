import React from 'react';
import styled from 'styled-components';

import { Colors } from 'config/colors';

type BarProp = {
  color: string | Colors;
  length: number;
};

const Container = styled.div`
  display: inline-table;
  background: #2A3F5A;
  z-index: 1;
  height: 100%;
  min-height: 65px;
  width: 32px;
  margin: 0 5px;
`;
const Bar = styled.div`
  background: ${(p: BarProp) => p.color};
  z-index: 2;
  height: ${(p: BarProp) => p.length}%;
`;

type Prop = {
  max: number;
  value: number;
  color: string | Colors;
  invert?: boolean;
};

export const Column: React.FC<Prop> = ({
  color,
  max,
  value,
  invert
}) => {
  const length = React.useMemo(() => {
    return Math.round(value * 100 / max);
  }, [max, value]);

  return (
    <Container style={{
      transform: invert ? 'rotate(180deg)' : 'rotate(0deg)'
    }}>
      <Bar
        color={color}
        length={length}
      />
    </Container>
  );
};
