import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/fonts.css";

import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import { Footer } from "components/footer";

import { updateRef } from "store/referral";
import { Colors } from "@/config/colors";
import { BaseStyles, AnimationStyles } from "@/styles";

export var MyApp = function ({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.ref) {
      updateRef(String(router.query.ref));
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content={Colors.Primary} />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>
      <BaseStyles />
      <AnimationStyles />
      <NextNprogress
        color={Colors.Primary}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default appWithTranslation(MyApp);
