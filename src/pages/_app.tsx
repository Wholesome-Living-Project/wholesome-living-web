import { LightModeContext } from "@/hooks/useLightMode";
import Providers from "@/providers/Providers";
import Theme from "@/theme/mainTheme";
import { GlobalStyle, SIDE_BAR_WIDTH_SMALL } from "@/theme/theme";
import { Flex, Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useToggle } from "@uidotdev/usehooks";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled(Flex)<{ $lightMode: boolean }>`
  position: relative;
  height: 100vh;
  background: linear-gradient(
    135deg,
    ${(p) => (p.$lightMode ? "#f8f8f8" : "#0c0c0c")},
    ${(p) => (p.$lightMode ? "#eaf2ff" : "#001c3d")}
  );
`;

const SideBarPadder = styled(Flex)`
  width: ${SIDE_BAR_WIDTH_SMALL}px;
`;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Footer() {
  return null;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [lightMode, toggleLightMode] = useToggle(false);
  const getLayout = Component.getLayout ?? ((page) => page);

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
              <Wrapper $lightMode={lightMode} direction={"column"} grow={"1"}>
                <Flex direction={"row"} grow={"1"}>
                  {getLayout(<Component {...pageProps} />)}
                </Flex>
                <Footer />
              </Wrapper>
            </Providers>
            {/*  <ThemePanel />*/}
          </RadixTheme>
        </Theme>
      </LightModeContext.Provider>
    </>
  );
}

export default MyApp;
