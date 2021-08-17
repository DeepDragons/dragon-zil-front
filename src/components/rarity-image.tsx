import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';

import { EMPTY } from 'config/emty';
import { RARITY } from 'lib/rarity';
import { Colors } from '@/config/colors';

type Prop = {
  id: string;
  url: string;
  rarity: number;
  onClick?: () => void;
};

export const RarityImage: React.FC<Prop> = ({
  id,
  rarity,
  url,
  onClick = () => null
}) => {
  const [loadError, setLoadError] = React.useState(false);

  switch (rarity) {
    case 0:
      return (
        <svg width="250" height="250" viewBox="0 0 319 319" fill="none">
          <circle cx="160" cy="160" r="127.5" fill="#1F222E" stroke="#B0C3D9"/>
          <circle cx="160" cy="159" r="116" fill="#141414"/>
          <circle cx="160" cy="159" r="116" fill={`url(#pattern-${id})`}/>
          <circle cx="160.5" cy="159.5" r="116" stroke="#B0C3D9"/>
          <defs>
            <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref={`#dragon-${id}`} transform="translate(-0.0800962 0.0220893) scale(0.000566002)"/>
            </pattern>
            <ProgressiveImage
              src={url}
              placeholder={url}
            >
              {(src: string) => (
                <image
                  id={`dragon-${id}`}
                  xlinkHref={loadError ? EMPTY : src}
                  color={RARITY[rarity].color}
                  onError={() => setLoadError(true)}
                  onClick={onClick}
                />
              )}
            </ProgressiveImage>
          </defs>
        </svg>
      );
    case 1:
      return (
        <svg width="250" height="250" viewBox="0 0 274 267" fill="none">
          <path
            d="M28.5321 74.4816L15.9641 75.4106C7.82302 91.2853 2.71464 108.972 1.40381 127.706L10.624 135.704C10.5873 136.957 10.5688 138.215 10.5688 139.477C10.5688 169.873 21.295 197.763 39.1689 219.57L36.8136 229.179C50.5014 244.093 67.4778 255.94 86.5937 263.571L94.7313 258.67C107.948 263.357 122.176 265.908 137 265.908C151.251 265.908 164.952 263.55 177.734 259.203L185.759 264.174C204.989 256.768 222.111 245.116 235.974 230.365L233.767 220.851C252.278 198.86 263.431 170.471 263.431 139.477C263.431 138.721 263.424 137.966 263.411 137.212L272.596 129.443C271.521 110.657 266.63 92.8933 258.685 76.9152L246.273 75.8424C229.42 46.9644 201.447 25.3706 168.225 16.9312L162.912 3.93119C154.507 2.30458 145.825 1.45264 136.945 1.45264C128.671 1.45264 120.569 2.19218 112.703 3.60877L107.216 16.5743C73.8883 24.622 45.7115 45.8734 28.5321 74.4816Z"
            stroke="#5E98D9"
            strokeWidth="2"
          />
          <circle cx="137" cy="139" r="116" fill="#141414"/>
          <circle cx="137" cy="139" r="116" fill={`url(#pattern-${id})`}/>
          <defs>
            <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref={`#dragon-${id}`} transform="scale(0.0005)"/>
            </pattern>
            <ProgressiveImage
              src={url}
              placeholder={url}
            >
              {(src: string) => (
                <image
                  id={`dragon-${id}`}
                  xlinkHref={loadError ? EMPTY : src}
                  color={RARITY[rarity].color}
                  onError={() => setLoadError(true)}
                  onClick={onClick}
                />
              )}
            </ProgressiveImage>
          </defs>
        </svg>
      );
    case 2:
      return (
        <svg width="250" height="250" viewBox="0 0 272 272" fill="none">
          <path d="M42.6399 43.1879H226.905V227.453H42.6399V43.1879Z" stroke="#506DFF" strokeWidth="2"/>
          <path d="M134.773 5.23291L264.86 135.32L134.773 265.408L4.68498 135.32L134.773 5.23291Z" stroke="#506DFF" strokeWidth="2"/>
          <path d="M56.3357 31.279L238.813 56.8846L213.208 239.362L30.7301 213.756L56.3357 31.279Z" stroke="#506DFF" strokeWidth="2"/>
          <path d="M152.849 6.49512L263.597 153.398L116.695 264.146L5.94625 117.243L152.849 6.49512Z" stroke="#506DFF" strokeWidth="2"/>
          <circle cx="133.862" cy="135.32" r="116" fill={Colors.Black}/>
          <circle cx="133.862" cy="135.32" r="116" fill={`url(#pattern-${id})`}/>
          <defs>
            <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref={`#dragon-${id}`} transform="scale(0.0005)"/>
            </pattern>
            <ProgressiveImage
              src={url}
              placeholder={url}
            >
              {(src: string) => (
                <image
                  id={`dragon-${id}`}
                  xlinkHref={loadError ? EMPTY : src}
                  color={RARITY[rarity].color}
                  onError={() => setLoadError(true)}
                  onClick={onClick}
                />
              )}
            </ProgressiveImage>
          </defs>
        </svg>
      );
    case 3:
      return (
        <svg width="250" height="250" viewBox="0 0 282 282" fill="none">
          <path d="M141.435 7.93856L181.378 71.8994L256.742 74.511L221.322 141.083L256.742 207.656L181.378 210.268L141.435 274.228L101.491 210.268L26.128 207.656L61.5479 141.083L26.128 74.511L101.491 71.8994L141.435 7.93856Z" stroke="#A407CB" strokeWidth="2"/>
          <path d="M80.2465 35.1015L141.435 67.657L202.624 35.1014L205.025 104.37L263.813 141.084L205.025 177.797L202.624 247.066L141.435 214.51L80.2465 247.066L77.846 177.797L19.0576 141.084L77.846 104.37L80.2465 35.1015Z" stroke="#A407CB" strokeWidth="2"/>
          <circle cx="140.934" cy="141.083" r="116" fill="#141414"/>
          <circle cx="140.934" cy="141.083" r="116" fill={`url(#pattern-${id})`}/>
          <defs>
            <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref={`#dragon-${id}`} transform="scale(0.0005)"/>
            </pattern>
            <ProgressiveImage
              src={url}
              placeholder={url}
            >
              {(src: string) => (
                <image
                  id={`dragon-${id}`}
                  xlinkHref={loadError ? EMPTY : src}
                  color={RARITY[rarity].color}
                  onError={() => setLoadError(true)}
                  onClick={onClick}
                />
              )}
            </ProgressiveImage>
          </defs>
        </svg>
      );
      case 4:
        return (
          <svg width="250" height="250" viewBox="0 0 265 274" fill="none">
            <circle cx="130.986" cy="137" r="116" fill="#141414"/>
            <circle cx="130.986" cy="137" r="116" fill={`url(#pattern-${id})`}/>
            <path d="M11.9855 75L25.5747 83.1037C17.6853 98.9719 13.2515 116.843 13.2515 135.744C13.2515 198.805 62.6041 250.4 124.985 254.398V271M252.985 197L239.396 188.896C247.286 173.028 251.719 155.157 251.719 136.256C251.719 73.1951 202.367 21.6002 139.985 17.6025V1M253 104.434L262.764 98.7973C259.937 89.0715 256.051 79.7962 251.239 71.1046L248.797 66.8751C243.57 58.1855 237.397 50.1292 230.42 42.8485L220.831 48.3849C205.527 32.9955 186.234 21.5774 164.633 15.812V4.85394C154.296 2.3352 143.495 1 132.382 1C121.27 1 110.47 2.335 100.133 4.85336V15.8121C78.6419 21.5481 59.4355 32.8793 44.1695 48.1499L34.5728 42.6092C27.5048 49.9501 21.2553 58.0847 15.9714 66.8661L13.5189 71.1139C8.75668 79.7181 4.90157 88.8942 2.08261 98.513L11.8421 104.148C9.10699 114.416 7.64915 125.206 7.64915 136.337C7.64915 147.63 9.14986 158.572 11.9627 168.975L2 174.727C4.82014 184.429 8.69374 193.682 13.4887 202.355L16.0035 206.71C21.2235 215.377 27.3841 223.412 34.3439 230.676L44.4739 224.827C59.6905 239.944 78.7845 251.163 100.133 256.861V268.67C110.47 271.188 121.27 272.523 132.382 272.523C143.495 272.523 154.296 271.188 164.633 268.669V256.861C186.08 251.137 205.251 239.841 220.502 224.618L230.624 230.462C237.502 223.252 243.595 215.286 248.765 206.702L251.27 202.363C256.12 193.593 260.027 184.229 262.856 174.408L252.89 168.654C255.647 158.347 257.117 147.514 257.117 136.337C257.117 125.31 255.686 114.617 253 104.434ZM240.254 54.3197C247.265 63.4794 253.135 73.5582 257.654 84.3439L250.612 88.4097C246.18 77.5723 240.309 67.4798 233.236 58.3714L240.254 54.3197ZM24.3746 219.028C17.3789 209.857 11.5246 199.769 7.02369 188.975L14.1015 184.889C18.4833 195.748 24.3085 205.867 31.3387 215.007L24.3746 219.028Z" stroke="#FF5560" strokeWidth="2"/>
            <defs>
            <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref={`#dragon-${id}`} transform="scale(0.0005)"/>
            </pattern>
              <ProgressiveImage
                  src={url}
                  placeholder={url}
                >
                  {(src: string) => (
                    <image
                      id={`dragon-${id}`}
                      xlinkHref={loadError ? EMPTY : src}
                      color={RARITY[rarity].color}
                      onError={() => setLoadError(true)}
                      onClick={onClick}
                    />
                  )}
                </ProgressiveImage>
            </defs>
          </svg>          
        );
      case 5:
        return (
          <svg width="250" height="250" viewBox="0 0 341 361" fill="none">
            <path d="M162.971 315.21L164.962 307.779C196.417 308.975 226.659 298.264 250.156 278.84L245.534 267.828" stroke="#44F319" strokeWidth="2"/>
            <path d="M231.703 60.6753L229.712 68.1059C280.661 94.9954 308.149 154.386 292.609 212.385L299.382 218.182" stroke="#44F319" strokeWidth="2"/>
            <path d="M109.451 300.869L111.442 293.438C60.4934 266.549 33.005 207.158 48.5456 149.159L41.7727 143.362" stroke="#44F319" strokeWidth="2"/>
            <circle cx="169.998" cy="180.307" r="116" fill="#141414"/>
            <circle cx="169.998" cy="180.307" r="116" fill={`url(#pattern-${id})`}/>
            <defs>
              <pattern id={`pattern-${id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref={`#dragon-${id}`} transform="translate(-0.126239 -0.0698607) scale(0.000626239)"/>
              </pattern>
              <ProgressiveImage
                src={url}
                placeholder={url}
              >
                {(src: string) => (
                  <image
                    id={`dragon-${id}`}
                    xlinkHref={loadError ? EMPTY : src}
                    color={RARITY[rarity].color}
                    onError={() => setLoadError(true)}
                    onClick={onClick}
                  />
                )}
              </ProgressiveImage>
            </defs>
          </svg>
        );
    default:
      return null;
  }
};
