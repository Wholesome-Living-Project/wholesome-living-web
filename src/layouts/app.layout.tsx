import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction={"column"} grow={"1"}>
      <Header />
      {/* <RequiresAuthentication>*/}
      <Container mx={"4"} mt={"4"}>
        {children}
      </Container>
      {/*</RequiresAuthentication>*/}
      <Footer />
    </Flex>
  );
};

export default AppLayout;
