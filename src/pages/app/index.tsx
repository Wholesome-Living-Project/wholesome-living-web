import AppLayout from "@/layouts/app.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";

const Home = () => {
  return (
    <Grid gap={"4"} columns={"2"}>
      <Flex direction={"column"} justify={"between"} gap={"1"}>
        <Heading color={"gray"} highContrast>
          Welcome Back
        </Heading>
        <Text color={"gray"}>
          This is your dashboard. It acts as a summary of your progress and as a
          hub for your habits.
        </Text>
      </Flex>
    </Grid>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
