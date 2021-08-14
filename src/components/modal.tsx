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
    background: rgba(#132639, .9);

    .modal-md {
      right: 0;
      left: 0;
      margin: 10% auto 50px;
      max-width: 635px;
      width: 100%;
      background: white;
      padding: 0;
      z-index: 100;
      border-radius: 3px;
      box-shadow: 0 0 8px rgba(black, .3);
      animation: dialog-scale-start .3s ease-in-out forwards;
    }
  }
`;
const Title = styled.h1`
  padding: 30px;
  color: #336699;
  background: #ecf2f9;
  border-radius: 3px 3px 0 0;
  font-size: 24px;
  margin: 0;
  position: relative;

  .close {
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
    font-size: 20px;
  }
`;
const ModalContent = styled.div`
  padding: 30px;
`;

type Prop = {
  show: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Prop> = ({
  children,
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
        <Title>
          React Dialog
          <span className="close" onClick={onClose}>×</span>
        </Title>
        <ModalContent>
          {children}
          <button className="btn" onClick={onClose}>Close</button>
        </ModalContent>
      </div>
    </Container>
  );
};
