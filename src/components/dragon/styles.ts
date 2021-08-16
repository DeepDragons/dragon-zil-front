import styled from 'styled-components';
import { Colors } from 'config/colors';

type ContainerProp = {
  color: string;
}

export const Container = styled.div`
  background: ${Colors.Secondary};

  border: 1px solid ${(p: ContainerProp) => p.color};
  box-sizing: border-box;
  border-radius: 16px;

  padding: 25px;
  margin: 15px;

  @media (max-width: 550px) {
    padding: 10px;
    width: calc(100vw - 20px);
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;

  img, svg {
    margin-left: 10px;
  }
`;
export const Seporate = styled.hr`
  border: 1px solid #2A3F5A;
`;

export const CardContainer = styled.div`
  width: 100%;
  text-align: left;
`;
