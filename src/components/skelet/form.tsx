import styled from "styled-components";

import { Wrapper } from "./card";

export const SkeletForm = styled(Wrapper)`
  min-width: 300px;
  width: 450px;
  height: 250px;

  @media (max-width: 400px) {
    width: 290px;
  }
`;
