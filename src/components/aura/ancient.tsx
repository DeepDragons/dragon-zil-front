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

export const AncientAura: React.FC<Prop> = ({
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
      viewBox="0 0 282 283"
      fill="none"
    >
      <path
        d="M149.47 18.93L141.5 6.4917L133.587 18.841C116.762 19.8176 100.843 24.175 86.501 31.244L73.7459 24.6464L73.0844 38.9432C59.3076 48.046 47.4693 59.8456 38.3214 73.59L24.1464 74.2459L30.6539 86.8265C23.45 101.268 19.0019 117.324 17.9981 134.307L5.99176 142L18.0392 149.719C19.1267 166.584 23.6115 182.523 30.8164 196.859L24.1464 209.754L38.7632 210.431C47.8423 223.883 59.5108 235.444 73.0539 244.398L73.7459 259.354L87.1355 252.428C101.191 259.255 116.741 263.485 133.162 264.495L141.5 277.508L149.899 264.401C166.071 263.223 181.377 258.919 195.213 252.091L209.254 259.354L209.989 243.47C222.923 234.665 234.092 223.46 242.854 210.495L258.854 209.754L251.499 195.536C258.196 181.801 262.41 166.633 263.56 150.617L277.008 142L263.606 133.413C262.536 117.278 258.355 101.994 251.659 88.1549L258.854 74.2459L243.296 73.526C234.462 60.2709 223.124 48.8271 209.959 39.8703L209.254 24.6464L195.843 31.5836C181.72 24.5129 166.047 20.0798 149.47 18.93Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M280.595 141.681C280.595 218.87 218.02 281.445 140.831 281.445C63.641 281.445 1.06641 218.87 1.06641 141.681C1.06641 64.4911 63.641 1.9165 140.831 1.9165C218.02 1.9165 280.595 64.4911 280.595 141.681Z"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        cx="141"
        cy="142"
        r="116"
        fill={Colors.Black}
      />
      <circle
        cx="141"
        cy="142"
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
            transform="scale(0.0005)"
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
