import styled from 'styled-components';
import { Colors } from 'config/colors';

export const Container = styled.div`
  background: ${Colors.Secondary};

  border: 1px solid #FFB411;
  box-sizing: border-box;
  border-radius: 16px;

  padding: 25px;
  margin-bottom: 30px;
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