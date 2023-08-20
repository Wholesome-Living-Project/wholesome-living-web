import MainLayout from "@/layouts/main.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";

const Home = () => {
  return (
    <Grid gap={"4"} columns={"2"}>
      <Flex direction={"column"} justify={"between"} gap={"3"}>
        <Heading color={"gray"} highContrast size={"9"}>
          Create wholesome habits
        </Heading>
        <Text color={"gray"} size={"5"}>
          Wholesome is a habit tracker that helps you create and maintain
        </Text>
      </Flex>
    </Grid>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
