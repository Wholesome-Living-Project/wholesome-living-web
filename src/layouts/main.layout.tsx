import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useUser } from "@/hooks/useUser";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { firebaseUser } = useUser();
  return (
    <Flex direction={"column"} grow={"1"}>
      <Header isHomeHeader={!firebaseUser} />
      <Container mx={"4"} mt={"4"}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
