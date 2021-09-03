import { AppProps } from 'next/app';
import { BaseStyles, AnimationStyles } from '@/styles';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Footer } from 'components/footer';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <AnimationStyles />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
