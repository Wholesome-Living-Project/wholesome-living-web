import RequiresAuthentication from "@/components/helpers/RequiresAuthentication";
import Header from "@/components/layout/Header";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren, useEffect } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {});

  return (
    // @ts-ignore
    <Flex direction={"column"} grow={"1"}>
      <Header />
      <RequiresAuthentication>
        <Container>{children}</Container>
      </RequiresAuthentication>
    </Flex>
  );
};

export default AppLayout;
