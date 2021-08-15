import styled from 'styled-components';

export const DragonPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  max-width: 943px;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;
