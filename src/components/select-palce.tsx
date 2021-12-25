import React from "react";
import styled from "styled-components";
import { Colors } from "@/config/colors";

type ContainerProp = {
  color: string | Colors;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px dashed ${Colors.Muted};
  border-width: 3px;
  cursor: copy;

  :hover {
    border-color: ${(p: ContainerProp) => p.color};

    svg > path {
      fill: ${(p: ContainerProp) => p.color};
    }
  }
`;

type Prop = {
  width?: string | number;
  height?: string | number;
  color: string | Colors;
  onClick?: () => void;
};

export var SelectPalce: React.FC<Prop> = function ({
  color,
  width = 250,
  height = 250,
  onClick = () => null,
}) {
  return (
    <Container
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      color={color}
      onClick={onClick}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <mask id="path-1-inside-1" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40 0H20V20H0V40H20V60H40V40H60V20H40V0Z"
          />
        </mask>
        <path
          d="M20 0V-2H18V0H20ZM40 0H42V-2H40V0ZM20 20V22H22V20H20ZM0 20V18H-2V20H0ZM0 40H-2V42H0V40ZM20 40H22V38H20V40ZM20 60H18V62H20V60ZM40 60V62H42V60H40ZM40 40V38H38V40H40ZM60 40V42H62V40H60ZM60 20H62V18H60V20ZM40 20H38V22H40V20ZM20 2H40V-2H20V2ZM22 20V0H18V20H22ZM0 22H20V18H0V22ZM2 40V20H-2V40H2ZM20 38H0V42H20V38ZM22 60V40H18V60H22ZM40 58H20V62H40V58ZM38 40V60H42V40H38ZM60 38H40V42H60V38ZM58 20V40H62V20H58ZM40 22H60V18H40V22ZM38 0V20H42V0H38Z"
          fill={Colors.Muted}
          mask="url(#path-1-inside-1)"
        />
      </svg>
    </Container>
  );
};
