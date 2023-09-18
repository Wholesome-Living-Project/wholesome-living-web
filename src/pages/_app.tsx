import Header from "@/components/layout/Header";
import { LightModeContext } from "@/hooks/useLightMode";
import { LoadingGuardProvider } from "@/providers/LoadingGuardProvider";
import Providers from "@/providers/Providers";
import Theme from "@/theme/mainTheme";
import { GlobalStyle } from "@/theme/theme";
import { Flex, Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import "react-vis/dist/style.css";
import styled from "styled-components";

const Wrapper = styled(Flex)<{ $lightMode: boolean }>`
  position: relative;
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${(p) => (p.$lightMode ? "#f8f8f8" : "#0c0c0c")},
    ${(p) => (p.$lightMode ? "#eaf2ff" : "#001c3d")}
  );
`;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [lightMode, setLightMode] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleLightMode = useCallback(
    (lm: boolean) => {
      if (lightMode === undefined) return;
      setLightMode(!lightMode);
      localStorage.setItem("lightMode", lm ? "true" : "false");
    },
    [lightMode]
  );

  return (
    <>
      <Head>
        <title>Wholesome Living</title>
        <meta name="description" content="Wholesome Living" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <LightModeContext.Provider value={{ lightMode, toggleLightMode }}>
        <Theme>
          <RadixTheme
            appearance={lightMode ? "light" : "dark"}
            panelBackground={"translucent"}
            scaling="95%"
            hasBackground={false}
          >
            <Providers>
              <LoadingGuardProvider
                lightMode={lightMode}
                setLightMode={setLightMode}
              >
                <Wrapper
                  $lightMode={lightMode}
                  direction={"column"}
                  grow={"1"}
                  pb={"8"}
                >
                  <Flex direction={"column"} grow={"1"}>
                    <Header />
                    {getLayout(<Component {...pageProps} />)}
                  </Flex>
                </Wrapper>
              </LoadingGuardProvider>
            </Providers>
            {/*  <ThemePanel />*/}
          </RadixTheme>
        </Theme>
      </LightModeContext.Provider>
    </>
  );
}

export default MyApp;
