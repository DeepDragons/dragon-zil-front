import React from "react";
import { Colors } from "config/colors";

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export var DefenceIcon: React.FC<Prop> = function ({
  color = Colors.Success,
  width = 32,
  height = 32,
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <path
        d="M6.00005 4V4.52595C6.00005 9.55877 6.50524 14.5781 7.98208 18.6493C9.45878 22.7207 11.9527 25.8734 15.8756 26.9695L15.9805 27L16.0885 26.9756C20.3913 26.0429 22.9165 22.8767 24.3014 18.7637C25.6862 14.6508 26 9.56101 26 4.52595V4.0001L25.4888 4.07473C19.1625 4.99014 12.8388 4.99239 6.51286 4.07473L6 4.0001L6.00005 4ZM6.90411 5.04263C9.93821 5.45902 12.9728 5.66663 16.0076 5.66614V14.6677H24.3928C24.1575 16.0127 23.8502 17.2895 23.4529 18.4695C22.1408 22.3663 19.9143 25.1685 16.009 26.058C16.0087 26.0578 16.0081 26.0581 16.0076 26.058V14.6677H7.8051C7.18765 11.6926 6.92824 8.38433 6.90411 5.04273V5.04263Z"
        fill={color}
      />
    </svg>
  );
};
