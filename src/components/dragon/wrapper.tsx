import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 30px;
  max-width: 1024px;
  width: 100%;

  @media (max-width: 930px) {
    justify-content: center;
  }
`;
