import styled from "styled-components";
import { StyleFonts } from "config/fonts";
import { Colors } from "config/colors";

type Prop = {
  size?: number | string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  nowrap?: boolean;
  upperCase?: boolean;
  css?: string;
};

export const Text = styled.div`
  font-family: ${(props: Prop) => props.fontVariant};
  font-size: ${(props: Prop) => props.size};
  color: ${(props: Prop) => props.fontColors};
  white-space: ${(props: Prop) => (props.nowrap ? `nowrap` : `normal`)};
  text-transform: ${(props: Prop) => (props.upperCase ? `uppercase` : `initial`)};
  font-style: normal;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-block-start: 0.6em;
  margin-block-end: 0.6em;

  @media (max-width: 500px) {
    font-size: ${(props: Prop) => Number(String(props.size).split(`px`)[0]) / 1.5}px;
  }

  ${(props: Prop) => props.css}
`;

Text.defaultProps = {
  size: `20px`,
  fontVariant: StyleFonts.FiraSansRegular,
  fontColors: Colors.White,
  nowrap: false,
  upperCase: false,
  css: ``,
};
