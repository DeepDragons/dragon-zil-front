import React from 'react';
import { Colors } from 'config/colors';

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export const SpotsIcon: React.FC<Prop> = ({
  color = Colors.Muted,
  width = 32,
  height = 32
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M16.0625 9.5C16.0625 11.9853 13.754 14 10.9062 14C8.05853 14 5.75 11.9853 5.75 9.5C5.75 7.01472 8.05853 5 10.9062 5C13.754 5 16.0625 7.01472 16.0625 9.5Z"
        fill={color}
      />
      <path
        d="M17.9375 22.5C17.9375 24.433 16.0487 26 13.7187 26C11.3888 26 9.5 24.433 9.5 22.5C9.5 20.567 11.3888 19 13.7187 19C16.0487 19 17.9375 20.567 17.9375 22.5Z"
        fill={color}
      />
      <path
        d="M25.4375 13.5C25.4375 14.8807 23.9684 16 22.1562 16C20.3441 16 18.875 14.8807 18.875 13.5C18.875 12.1193 20.3441 11 22.1562 11C23.9684 11 25.4375 12.1193 25.4375 13.5Z"
        fill={color}
      />
    </svg>
  );
};
