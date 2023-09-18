import RequiresAuthentication from "@/components/helpers/RequiresAuthentication";
import Footer from "@/components/layout/Footer";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction={"column"} grow={"1"}>
      <RequiresAuthentication>
        <Container mx={"4"} mt={"4"}>
          {children}
        </Container>
      </RequiresAuthentication>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
