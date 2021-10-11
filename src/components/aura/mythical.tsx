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

export const MythicalAura: React.FC<Prop> = ({
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
        d="M141.435 7.93856L181.378 71.8994L256.742 74.511L221.322 141.083L256.742 207.656L181.378 210.268L141.435 274.228L101.491 210.268L26.128 207.656L61.5479 141.083L26.128 74.511L101.491 71.8994L141.435 7.93856Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M80.2465 35.1015L141.435 67.657L202.624 35.1014L205.025 104.37L263.813 141.084L205.025 177.797L202.624 247.066L141.435 214.51L80.2465 247.066L77.846 177.797L19.0576 141.084L77.846 104.37L80.2465 35.1015Z"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        cx="140.934"
        cy="141.083"
        r="116"
        fill={Colors.Black}
      />
      <circle
        cx="140.934"
        cy="141.083"
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
