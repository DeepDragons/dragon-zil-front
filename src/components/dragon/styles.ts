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
    width: 530px;
  }

  @media (max-width: 450px) {
    width: 400px;
  }

  @media (max-width: 350px) {
    width: 300px;
  }

  @media (max-width: 250px) {
    width: 200px;
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