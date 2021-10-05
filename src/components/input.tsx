import styled from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  size?: number | string;
  border?: number | string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  color?: Colors;
  css?: string;
};

export const Input = styled.input`
  background: transparent;
  border: 0;
  outline: none;
  color: ${Colors.White};
  font-size: ${(props: Prop) => props.size}px;
  font-family: ${(props: Prop) => props.fontVariant};
  color: ${(props: Prop) => props.fontColors};
  border: ${(props: Prop) => props.border}px solid;

  height: 50px;
  width: 100%;

  border-radius: 10px;
  user-select: none;

  @media (max-width: 500px) {
    font-size: ${(props: Prop) => Number(String(props.size).split('px')[0]) / 1.5}px;
  }

  :before, :after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
  }

  ${(props: Prop) => props.css}
`;

Input.defaultProps = {
  fontVariant: StyleFonts.FiraSansRegular,
  fontColors: Colors.White,
  color: Colors.Primary,
  size: 18,
  border: 0,
  css: '',
};
