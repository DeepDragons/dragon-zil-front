import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  max-width: 943px;

  @media (max-width: 940px) {
    justify-content: center;
  }
`;
