import React from "react";
import ProgressiveImage from "react-progressive-graceful-image";

import { EMPTY } from "config/emty";
import { Colors } from "@/config/colors";

type Prop = {
  id: string;
  url: string;
  width?: string | number;
  height?: string | number;
  color: Colors | string;
  onClick?: () => void;
};

export var RareAura: React.FC<Prop> = function ({
  id,
  color,
  url,
  width = 250,
  height = 250,
  onClick = () => null,
}) {
  const [loadError, setLoadError] = React.useState(false);

  return (
    <svg width={width} height={height} viewBox="0 0 275 265" fill="none">
      <path
        d="M42.6399 43.1879H226.905V227.453H42.6399V43.1879Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M134.773 5.23291L264.86 135.32L134.773 265.408L4.68498 135.32L134.773 5.23291Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M56.3357 31.279L238.813 56.8846L213.208 239.362L30.7301 213.756L56.3357 31.279Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M152.849 6.49512L263.597 153.398L116.695 264.146L5.94625 117.243L152.849 6.49512Z"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="133.862" cy="135.32" r="116" fill={Colors.Black} />
      <circle
        cx="133.862"
        cy="135.32"
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
          <use xlinkHref={`#dragon-${id}`} transform="scale(0.0022)" />
        </pattern>
        <ProgressiveImage src={url} placeholder={url}>
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
