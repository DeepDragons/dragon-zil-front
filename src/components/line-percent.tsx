import React from "react";
import styled from "styled-components";

import { Colors } from "config/colors";

type BarProp = {
  color: string | Colors;
  length: number;
};

const Container = styled.div`
  display: inline-table;
  background: #2a3f5a;
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
  border-radius: 10px;
  z-index: 2;
  width: ${(p: BarProp) => p.length}%;
`;

type Prop = {
  max: number;
  value: number;
  color: string | Colors;
  width?: number;
  invert?: boolean;
};

export var LinePercent: React.FC<Prop> = function ({
  color,
  max,
  value,
  invert,
  width = 100,
}) {
  const length = React.useMemo(
    () => Math.round((value * 100) / max),
    [max, value],
  );

  return (
    <Container
      style={{
        width: `${width}px`,
        transform: invert ? `rotate(180deg)` : `rotate(0deg)`,
      }}
    >
      <Bar color={color} length={length} />
    </Container>
  );
};
