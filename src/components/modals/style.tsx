import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';
import { Button } from 'components/button';

export const ModalTitle = styled(Text)`
  padding: 20px;
`;
export const ModalButton = styled(Button)`
  min-width: 200px;
  margin: 8px;
  padding: 22px;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;

  padding: 24px;
`;

export const Container = styled.div`
  padding: 24px;

  .int-input {
    width: 100%;
  }
`;