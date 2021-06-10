import { createGlobalStyle } from 'styled-components';
import { StyleFonts } from 'config/fonts';

export const BaseStyles = createGlobalStyle`
  @font-face {
    font-family: ${StyleFonts.FiraSansBold};
    src: url('/fonts/FiraSans-Bold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansSemiBold};
    src: url('/fonts/FiraSans-SemiBold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansMedium};
    src: url('/fonts/FiraSans-Medium.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansRegular};
    src: url('/fonts/FiraSans-Regular.ttf');
  }
`;
