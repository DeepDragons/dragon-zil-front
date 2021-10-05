import { createGlobalStyle } from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

export const BaseStyles = createGlobalStyle`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  body {
    background: ${Colors.Black};
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  .input {
    text-align: center;
    background: transparent;
    border: 0;
    outline: none;
    color: ${Colors.Primary};
    font-size: 18px;
    font-family: ${StyleFonts.FiraSansRegular};
    color: ${Colors.Primary};
    border: 0px solid;
  
    height: 50px;
    width: 100%;
  
    border-radius: 10px;
    user-select: none;
  
    @media (max-width: 500px) {
      font-size: 13px;
    }  
  }

  @keyframes load {
    from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
  }
`;
