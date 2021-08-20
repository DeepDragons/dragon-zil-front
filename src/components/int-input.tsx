import React from 'react';
import styled from 'styled-components';
import { Text } from 'components/text';
import { Colors } from 'config/colors';

type Prop = {
  value: number;
  max?: number;
  onInput: (value: number) => void
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Colors.Darker};
  border-radius: 16px;
`;
const Input = styled.input`
  background: transparent;
  border: 0;
  outline: none;
  color: ${Colors.White};
  font-size: 40px;
  text-align: center;
  max-width: 96px;
`;
const Incr = styled.div`
  color: ${Colors.White};
  cursor: pointer;

  height: 80px;
  width: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IntInput: React.FC<Prop> = ({
  children,
  value,
  max,
  onInput
}) => {
  const onInputNumber = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const n = Number(e.currentTarget.value);

    if (max && max < n) {
      return null;
    }

    if (!isNaN(n)) {
      onInput(n);
    }
  }, [max]);

  const decrease = React.useCallback(() => {
    if (value <= 1) {
      return null;
    }

    onInput(value - 1);
  }, [value]);

  const increase = React.useCallback(() => {
    const newValue = value + 1;

    if (max && max < newValue) {
      return null;
    }

    onInput(newValue);
  }, [value, max]);

  return (
    <Container>
      <Text>
        {children}
      </Text>
      <Wrapper>
        <Incr onClick={decrease}>
          <svg
            width="36"
            height="2"
            viewBox="0 0 36 2"
            fill="none"
          >
            <path d="M0 1H36" stroke="white" strokeWidth="2"/>
          </svg>
        </Incr>
        <Input
          value={value}
          max={max}
          onInput={onInputNumber}
        />
        <Incr onClick={increase}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path d="M0 17H36M19 0L19 36" stroke="white" strokeWidth="2"/>
          </svg>
        </Incr>
      </Wrapper>
    </Container>
  );
};
