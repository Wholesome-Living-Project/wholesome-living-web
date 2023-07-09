import { Flex, SPACING } from "axelra-styled-bootstrap-grid";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import { MaxWidthContainer } from "../components/ui/MaxWidthContainer";
import { MAIN_THEME } from "../theme/makeTheme";
import {
  GlobalStyle,
  MOBILE_SIDEBAR_HEIGHT,
  SIDEBAR_WIDTH,
} from "../theme/theme";

const SideBarPadder = styled(Flex)`
  width: 100%;
  position: absolute;
  height: 100%;
  padding-top: ${MOBILE_SIDEBAR_HEIGHT}px;
  margin-top: ${SPACING * 2}px;
  margin-left: -${SPACING * 2}px;

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    padding-left: ${SIDEBAR_WIDTH}px;
    padding-top: 0px;
    margin-top: 0px;
    margin-left: ${SPACING * 2}px;
  }
`;

const MaxWidthContainerPadder = styled(MaxWidthContainer)`
  position: relative;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  display: grid;
  grid-template-columns: ${SIDEBAR_WIDTH} 1fr;
`;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <Head>
        <title>Wholesome Living</title>
        <meta name="description" content="Wholesome Living" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={MAIN_THEME}>
        <Header />
        <ContentWrapper>
          <SideBar />
          <Component {...pageProps} />
        </ContentWrapper>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
