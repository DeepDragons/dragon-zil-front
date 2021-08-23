import React from 'react';
import { Colors } from 'config/colors';

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export const AuraIcon: React.FC<Prop> = ({
  color = Colors.Muted,
  width = 31,
  height = 31
}) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M15.4687 3C8.48719 3 2.8125 8.82847 2.8125 15.9998C2.8125 23.1712 8.48711 29 15.4686 29C22.4502 29 28.125 23.1712 28.125 15.9998C28.125 8.82862 22.4503 3 15.4687 3ZM15.4687 4.43157C21.697 4.43157 26.7312 9.60231 26.7312 15.9998C26.7312 22.3975 21.697 27.5683 15.4687 27.5683C9.24042 27.5683 4.20643 22.3975 4.20643 15.9998C4.20643 9.60216 9.24042 4.43157 15.4687 4.43157ZM17.8518 6.41747C17.4937 6.41134 17.1337 6.44749 16.7744 6.53037C14.2103 7.12245 13.841 10.0515 16.825 10.3896C19.0652 10.6436 20.6282 14.4552 20.2285 17.3371C19.7295 20.9352 23.5901 20.7422 24.6404 17.1433C26.0072 12.4596 22.0767 6.49008 17.8518 6.41747ZM15.3841 11.4204L14.2016 14.705L11.89 14.2989L13.5834 16.3939L11.9479 18.4171L14.1156 18.0364L15.3841 21.5602L16.6524 18.0374L18.8428 18.4221L17.2032 16.3939L18.9008 14.2938L16.5663 14.7038L15.3841 11.4204Z"
        fill={color}
      />
    </svg>
  );
};
