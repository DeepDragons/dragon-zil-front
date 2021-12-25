import React from "react";
import styled from "styled-components";
import { Text } from "components/text";
import { Colors } from "config/colors";

type Prop = {
  value: number;
  max?: number;
  min?: number;
  bg?: string | Colors;
  onInput: (value: number) => void;
};

type WrapperProp = {
  color: Colors | string;
};

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
  background: ${(p: WrapperProp) => p.color};
  border-radius: 16px;
`;
const Input = styled.input`
  background: transparent;
  border: 0;
  outline: none;
  color: ${Colors.White};
  font-size: 40px;
  text-align: center;
  width: 100%;
`;
const Incr = styled.div`
  color: ${Colors.White};
  cursor: pointer;

  height: 80px;
  width: 80px;

  padding-right: 15px;
  padding-left: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export var IntInput: React.FC<Prop> = function ({
  children,
  value,
  max,
  onInput,
  min = 0,
  bg = Colors.Darker,
}) {
  const onInputNumber = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const n = Number(e.currentTarget.value);

      if (max && max < n) {
        return null;
      }

      if (!isNaN(n)) {
        onInput(n);
      }
    },
    [max],
  );

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
      <Text>{children}</Text>
      <Wrapper color={bg} className="int-input">
        <Incr onClick={decrease}>
          <svg width="36" height="2" viewBox="0 0 36 2" fill="none">
            <path d="M0 1H36" stroke="white" strokeWidth="2" />
          </svg>
        </Incr>
        <Input value={value} max={max} min={min} onInput={onInputNumber} />
        <Incr onClick={increase}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M0 17H36M19 0L19 36" stroke="white" strokeWidth="2" />
          </svg>
        </Incr>
      </Wrapper>
    </Container>
  );
};
