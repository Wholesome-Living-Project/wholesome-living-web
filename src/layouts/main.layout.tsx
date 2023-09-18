import Footer from "@/components/layout/Footer";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction={"column"} grow={"1"}>
      <Container mx={"4"} mt={"4"}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
