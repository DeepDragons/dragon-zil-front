import React from 'react';
import { Colors } from 'config/colors';

type Prop = {
  color?: string | Colors;
  width?: number | string;
  height?: number | string;
};

export const EyesIcon: React.FC<Prop> = ({
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
        d="M4.97541 10.4902C-4.68371 23.4163 13.5081 21.3935 13.5081 21.3935C8.76724 18.0752 4.97541 10.4902 4.97541 10.4902ZM5.26996 19.2739C4.77871 18.4017 5.0142 16.9105 5.92796 14.977C6.12994 15.2593 6.35312 15.5604 6.59212 15.8774L7.71584 19.763L8.14627 17.8184C9.0645 18.9106 10.0461 19.9403 11.0852 20.9015C8.04572 21.0059 5.91742 20.4217 5.26996 19.2748V19.2739ZM26.2755 10.4902C26.2755 10.4902 22.4827 18.0752 17.7427 21.3935C17.7419 21.3935 35.9337 23.4163 26.2746 10.4902H26.2755ZM25.9809 19.2739C25.3335 20.4226 23.2051 21.0059 20.1657 20.9034C21.2048 19.9422 22.1864 18.9125 23.1046 17.8202L23.5341 19.763L24.6579 15.8746C24.8828 15.5774 25.1042 15.2773 25.322 14.9742C26.2358 16.9114 26.474 18.4017 25.98 19.2748L25.9809 19.2739Z"
        fill={color}
      />
    </svg>
  );
};