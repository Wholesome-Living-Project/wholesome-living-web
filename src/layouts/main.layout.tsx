import { RedirectIfAuthenticated } from "@/components/helpers/RedirectIfAuthenticated";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren, useEffect } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {});

  return (
    // @ts-ignore
    <Flex direction={"column"} grow={"1"}>
      <Header isHomeHeader />
      <RedirectIfAuthenticated>
        <Container mx={"4"} mt={"4"}>
          {children}
        </Container>
      </RedirectIfAuthenticated>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
