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

export const CommonAura: React.FC<Prop> = ({
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
      viewBox="25 25 275 265"
      fill="none"
    >
      <circle
        cx="160"
        cy="160"
        r="127.5"
        fill={Colors.Black}
        stroke={color}
      />
      <circle
        cx="160"
        cy="159"
        r="116"
        fill={Colors.Black}
      />
      <circle
        cx="160"
        cy="159"
        r="116"
        fill={`url(#pattern-${id})`}
        onClick={onClick}
      />
      <circle
        cx="160.5"
        cy="159.5"
        r="116"
        stroke={color}
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
            transform="translate(-0.0800962 0.0220893) scale(0.000566002)"
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
