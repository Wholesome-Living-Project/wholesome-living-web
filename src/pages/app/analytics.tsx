import AppLayout from "@/layouts/app.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
`;

const Analytics = () => {
  return (
    <FlexContainer direction={{ sm: "column", initial: "row" }} gap={"2"}>
      <Grid columns={"2"} gap="2">
        <Flex direction={"column"} gap={"1"}>
          <Heading color={"gray"} highContrast>
            Your personal analytics
          </Heading>
          <Text color={"gray"}>
            Welcome to your analytics. Here you can see trends and other fun
            data, which can help you see how your habits are forming.
          </Text>
        </Flex>
      </Grid>
      {/*
      <MeditationView />
*/}
    </FlexContainer>
  );
};

Analytics.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Analytics;
