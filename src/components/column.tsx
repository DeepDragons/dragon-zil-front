import React from "react";
import styled from "styled-components";

import { Colors } from "config/colors";

type BarProp = {
  color: string | Colors;
  length: number;
};

const Container = styled.div`
  // display: inline-table;
  background: #2a3f5a;
  z-index: 1;
  height: 100%;
  height: 65px;
  width: 25px;
  margin: 2px 5px;

  @media (max-width: 450px) {
    width: 18px;
    height: 45px;
  }

  @media (max-width: 350px) {
    width: 15px;
    height: 35px;
  }

  @media (max-width: 250px) {
    width: 10px;
    height: 25px;
  }
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

export var Column: React.FC<Prop> = function ({
  color, max, value, invert,
}) {
  const length = React.useMemo(
    () => Math.round((value * 100) / max),
    [max, value],
  );

  return (
    <Container
      style={{
        transform: invert ? `rotate(180deg)` : `rotate(0deg)`,
      }}
    >
      <Bar color={color} length={length} />
    </Container>
  );
};
