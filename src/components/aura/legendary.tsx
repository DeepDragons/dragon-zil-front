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

export var LegendaryAura: React.FC<Prop> = function ({
  id,
  color,
  url,
  width = 250,
  height = 250,
  onClick = () => null,
}) {
  const [loadError, setLoadError] = React.useState(false);

  return (
    <svg width={width} height={height} viewBox="0 0 265 274" fill="none">
      <circle cx="130.986" cy="137" r="116" fill={Colors.Black} />
      <circle
        cx="130.986"
        cy="137"
        r="116"
        fill={`url(#pattern-${id})`}
        onClick={onClick}
      />
      <path
        d="M11.9855 75L25.5747 83.1037C17.6853 98.9719 13.2515 116.843 13.2515 135.744C13.2515 198.805 62.6041 250.4 124.985 254.398V271M252.985 197L239.396 188.896C247.286 173.028 251.719 155.157 251.719 136.256C251.719 73.1951 202.367 21.6002 139.985 17.6025V1M253 104.434L262.764 98.7973C259.937 89.0715 256.051 79.7962 251.239 71.1046L248.797 66.8751C243.57 58.1855 237.397 50.1292 230.42 42.8485L220.831 48.3849C205.527 32.9955 186.234 21.5774 164.633 15.812V4.85394C154.296 2.3352 143.495 1 132.382 1C121.27 1 110.47 2.335 100.133 4.85336V15.8121C78.6419 21.5481 59.4355 32.8793 44.1695 48.1499L34.5728 42.6092C27.5048 49.9501 21.2553 58.0847 15.9714 66.8661L13.5189 71.1139C8.75668 79.7181 4.90157 88.8942 2.08261 98.513L11.8421 104.148C9.10699 114.416 7.64915 125.206 7.64915 136.337C7.64915 147.63 9.14986 158.572 11.9627 168.975L2 174.727C4.82014 184.429 8.69374 193.682 13.4887 202.355L16.0035 206.71C21.2235 215.377 27.3841 223.412 34.3439 230.676L44.4739 224.827C59.6905 239.944 78.7845 251.163 100.133 256.861V268.67C110.47 271.188 121.27 272.523 132.382 272.523C143.495 272.523 154.296 271.188 164.633 268.669V256.861C186.08 251.137 205.251 239.841 220.502 224.618L230.624 230.462C237.502 223.252 243.595 215.286 248.765 206.702L251.27 202.363C256.12 193.593 260.027 184.229 262.856 174.408L252.89 168.654C255.647 158.347 257.117 147.514 257.117 136.337C257.117 125.31 255.686 114.617 253 104.434ZM240.254 54.3197C247.265 63.4794 253.135 73.5582 257.654 84.3439L250.612 88.4097C246.18 77.5723 240.309 67.4798 233.236 58.3714L240.254 54.3197ZM24.3746 219.028C17.3789 209.857 11.5246 199.769 7.02369 188.975L14.1015 184.889C18.4833 195.748 24.3085 205.867 31.3387 215.007L24.3746 219.028Z"
        stroke={color}
        strokeWidth="2"
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
