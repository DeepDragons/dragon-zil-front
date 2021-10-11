import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';

import { EMPTY } from 'config/emty';
import { Colors } from '@/config/colors';

type Prop = {
  id: string;
  url: string;
  width?: string | number;
  height?: string | number;
  color: Colors | string;
  onClick?: () => void;
};

export const UncommonAura: React.FC<Prop> = ({
  id,
  color,
  url,
  width = 250,
  height = 250,
  onClick = () => null
}) => {
  const [loadError, setLoadError] = React.useState(false);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 275 265"
      fill="none"
    >
      <path
        d="M28.5321 74.4816L15.9641 75.4106C7.82302 91.2853 2.71464 108.972 1.40381 127.706L10.624 135.704C10.5873 136.957 10.5688 138.215 10.5688 139.477C10.5688 169.873 21.295 197.763 39.1689 219.57L36.8136 229.179C50.5014 244.093 67.4778 255.94 86.5937 263.571L94.7313 258.67C107.948 263.357 122.176 265.908 137 265.908C151.251 265.908 164.952 263.55 177.734 259.203L185.759 264.174C204.989 256.768 222.111 245.116 235.974 230.365L233.767 220.851C252.278 198.86 263.431 170.471 263.431 139.477C263.431 138.721 263.424 137.966 263.411 137.212L272.596 129.443C271.521 110.657 266.63 92.8933 258.685 76.9152L246.273 75.8424C229.42 46.9644 201.447 25.3706 168.225 16.9312L162.912 3.93119C154.507 2.30458 145.825 1.45264 136.945 1.45264C128.671 1.45264 120.569 2.19218 112.703 3.60877L107.216 16.5743C73.8883 24.622 45.7115 45.8734 28.5321 74.4816Z"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        cx="137"
        cy="139"
        r="116"
        fill={Colors.Black}
      />
      <circle
        cx="137"
        cy="139"
        r="116"
        fill={`url(#pattern-${id})`}
        onClick={onClick}
      />
      <defs>
        <pattern
          id={`pattern-${id}`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref={`#dragon-${id}`}
            transform="scale(0.0022)"
          />
        </pattern>
        <ProgressiveImage
          src={url}
          placeholder={url}
        >
          {(src: string) => (
            <image
              id={`dragon-${id}`}
              xlinkHref={loadError ? EMPTY : src}
              color={color}
              onError={() => setLoadError(true)}
            />
          )}
        </ProgressiveImage>
      </defs>
    </svg>
  );
};
