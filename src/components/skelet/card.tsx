import React from 'react';
import styled from 'styled-components';

import { Colors } from 'config/colors';
import { Container, Empety } from 'components/card';

const Wrapper = styled(Container)`
  cursor: progress;
  background:
    linear-gradient(0.25turn, transparent, ${Colors.Darker}, transparent),
    linear-gradient(${Colors.Dark}, ${Colors.Dark}),
    radial-gradient(38px circle at 19px 19px, ${Colors.Dark} 50%, transparent 51%),
    linear-gradient(${Colors.Dark}, ${Colors.Dark});
  background-repeat: no-repeat;
  animation: loading 0.9s infinite;
`;
const Content = styled.div`
  border-radius: 8px;
  background: ${Colors.Black};

  height: 20px;
  width: 100px;

  align-self: end;
  margin: 10px;
`;

export const SkeletCard: React.FC = () => {
  return (
    <Wrapper>
      <Empety />
      <Content />
    </Wrapper>
  );
};
