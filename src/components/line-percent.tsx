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
  height: 10px;
  border-radius: 10px;
  width: 100px;
  margin: 2px 5px;
`;
const Bar = styled.div`
  background: ${(p: BarProp) => p.color};
  height: 10px;
  z-index: 2;
  width: ${(p: BarProp) => p.length}%;
`;

type Prop = {
  max: number;
  value: number;
  color: string | Colors;
  invert?: boolean;
};

export const LinePercent: React.FC<Prop> = ({
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
