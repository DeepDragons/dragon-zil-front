import styled from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  size?: string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  upperCase?: boolean;
  last?: boolean;
  css?: string;
};

export const ModalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  padding: 20px;

  font-family: ${(props: Prop) => props.fontVariant};
  font-size: ${(props: Prop) => props.size};
  color: ${(props: Prop) => props.fontColors};

  ${(p: Prop) => p.last ? '' : `border-bottom: 1px solid ${Colors.Muted}`};

  ${(props: Prop) => props.css}
`;

ModalItem.defaultProps = {
  fontVariant: StyleFonts.FiraSansRegular,
  fontColors: Colors.White,
  upperCase: false,
  size: '18px',
  last: false,
  css: '',
};
