import { RedirectIfAuthenticated } from "@/components/helpers/RedirectIfAuthenticated";
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
        <Container>{children}</Container>
      </RedirectIfAuthenticated>
    </Flex>
  );
};

export default MainLayout;
