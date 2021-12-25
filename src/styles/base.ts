import { createGlobalStyle } from "styled-components";
import { Colors } from "config/colors";

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

  @keyframes load {
    from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
  }
`;
