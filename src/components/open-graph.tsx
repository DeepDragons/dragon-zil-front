import React from 'react';

type Prop = {
  title?: string;
  alt?: string;
  img?: string;
  siteName?: string;
  site?: string;
  url?: string;
  description?: string;
}

export const OpenGraph: React.FC<Prop> = ({
  title = '',
  img = '',
  alt = '',
  site = '',
  siteName = '',
  url = '',
  description = ''
}) => {
  return (
    <>
      <meta
        name="twitter:image:src"
        content={img}
      />
      <meta
        name="twitter:site"
        content={site}
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        property="og:image"
        content={img}
      />
      <meta
        property="og:image:alt"
        content={alt}
      />
      <meta
        property="og:site_name"
        content={siteName}
      />
      <meta
        property="og:type"
        content="object"
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta
        property="og:description"
        content={description}
      />
    </>
  );
};
