import React from "react";
import { Colors } from "config/colors";

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export var TailIcon: React.FC<Prop> = function ({
  color = Colors.Muted,
  width = 32,
  height = 32,
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 35 35" fill="none">
      <path
        d="M26.7364 6.59742C18.4464 4.58008 5.81853 10.93 16.883 17.6532C19.8851 19.4774 17.8213 24.1698 11.8327 21.4825C3.8513 17.901 4.43113 11.245 7.30576 7.76229C7.66027 8.39092 7.95541 9.09799 8.22257 9.84023C9.14025 7.37691 10.9313 6.35326 12.7221 5.32976L12.754 5.31149C10.2269 4.0581 7.81515 4.55767 5.44781 5.74013C5.94949 6.03304 6.37274 6.42869 6.73833 6.89868C1.24033 10.3618 2.97289 21.197 10.1955 25.5889C19.3874 31.1782 30.2777 18.8458 20.2736 14.8264C11.3884 11.2565 22.183 8.03209 26.75 9.84023L26.7364 6.59742Z"
        fill={color}
      />
    </svg>
  );
};
