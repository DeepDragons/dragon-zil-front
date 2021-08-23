import React from 'react';
import styled from 'styled-components';

import { Colors } from 'config/colors';

const Container = styled.div`
  position: fixed;
  display: none;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;

  &.show-dialog {
    display: block;
    background: rgb(0 0 0 / 59%);

    .modal-md {
      right: 0;
      left: 0;
      margin: 10% auto 50px;
      max-width: 635px;
      width: 95%;
      background: ${Colors.Darker};
      padding: 0;
      z-index: 100;
      border-radius: 16px;
      box-shadow: 0 0 8px ${Colors.Black};
      animation: dialog-scale-start .3s ease-in-out forwards;
    }
  }
`;

type Prop = {
  title?: React.ReactNode;
  show: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Prop> = ({
  children,
  title,
  show,
  onClose
}) => {
  const node = React.useRef<HTMLDivElement | null>(null);

  const onToggle = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target == node.current) {
      onClose();
    }
  }, [node]);

  return (
    <Container
      className={show ? 'show-dialog' : ''}
      ref={(n) => node.current = n}
      onClick={onToggle}
    >
      <div className="modal-md">
        {title}
        <div>
          {children}
        </div>
      </div>
    </Container>
  );
};
