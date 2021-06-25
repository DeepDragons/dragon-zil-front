import { AppProps } from 'next/app';
import { BaseStyles, AnimationStyles } from '@/styles';
import React from 'react';

import { Footer } from 'components/footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <AnimationStyles />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
