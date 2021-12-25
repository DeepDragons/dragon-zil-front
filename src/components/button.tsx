import styled from "styled-components";
import { StyleFonts } from "config/fonts";
import { Colors } from "config/colors";

type Prop = {
  size?: number | string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  color?: Colors | string;
  nowrap?: boolean;
  upperCase?: boolean;
  css?: string;
};

export const Button = styled.button`
  cursor: pointer;
  border: 0;
  font-family: ${(props: Prop) => props.fontVariant};
  font-size: ${(props: Prop) => props.size};
  color: ${(props: Prop) => props.fontColors};
  text-transform: ${(props: Prop) => (props.upperCase ? `uppercase` : `initial`)};

  padding: 0.8rem;
  min-width: 142px;
  text-align: center;
  background: ${(props: Prop) => props.color};
  border-radius: 10px;
  user-select: none;

  :disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${(props: Prop) => props.css}
`;

Button.defaultProps = {
  fontVariant: StyleFonts.FiraSansRegular,
  fontColors: Colors.White,
  color: Colors.Primary,
  nowrap: false,
  upperCase: false,
  size: `18px`,
  css: ``,
};
