import React from "react";
import styled from "styled-components";

import { Colors } from "config/colors";
import { Container, Empety } from "components/card";

type Prop = {
  width?: string;
};

export const TextSkelet = styled(Container)`
  cursor: progress;
  background: linear-gradient(
      0.25turn,
      transparent,
      ${Colors.Darker},
      transparent
    ),
    linear-gradient(${Colors.Dark}, ${Colors.Dark}),
    radial-gradient(
      38px circle at 19px 19px,
      ${Colors.Dark} 50%,
      transparent 51%
    ),
    linear-gradient(${Colors.Dark}, ${Colors.Dark});
  background-repeat: no-repeat;
  animation: loading 0.9s infinite;

  width: ${(p: Prop) => p.width};
`;

TextSkelet.defaultProps = {
  width: `200px`,
};
