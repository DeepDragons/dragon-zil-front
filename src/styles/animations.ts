import { createGlobalStyle } from 'styled-components';

export const AnimationStyles = createGlobalStyle`
  @keyframes loading {  
    to {
      background-position: 205px 0,0 0,0 0,0;
    }
  }
  @keyframes fadeInFromNone {
    0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
  }
  @keyframes dialog-scale-start {
    0% {
      opacity: .5;
      transform: scale(1.15);
    }
  
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
