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

export var ImmortalAura: React.FC<Prop> = function ({
  id,
  color,
  url,
  width = 250,
  height = 250,
  onClick = () => null,
}) {
  const [loadError, setLoadError] = React.useState(false);

  return (
    <svg width={width} height={height} viewBox="50 50 240 275" fill="none">
      <path
        d="M162.971 315.21L164.962 307.779C196.417 308.975 226.659 298.264 250.156 278.84L245.534 267.828"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M231.703 60.6753L229.712 68.1059C280.661 94.9954 308.149 154.386 292.609 212.385L299.382 218.182"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M109.451 300.869L111.442 293.438C60.4934 266.549 33.005 207.158 48.5456 149.159L41.7727 143.362"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="169.998" cy="180.307" r="116" fill={Colors.Black} />
      <circle
        cx="169.998"
        cy="180.307"
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
            transform="translate(-0.126239 -0.0698607) scale(0.0027)"
          />
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
