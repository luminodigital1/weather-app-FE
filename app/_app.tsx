import { AppProps } from "next/app";
import React from "react";
import { enableStaticRendering } from "mobx-react-lite";
import "../app/globals.css";

enableStaticRendering(true);

function WeatherApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return <Component {...pageProps} />;
}

export default WeatherApp;
