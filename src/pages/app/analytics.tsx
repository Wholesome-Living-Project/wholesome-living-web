import { defaultTextProps } from "@/helpers/defaultTextProps";
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
    <FlexContainer direction={"column"} gap={"2"}>
      <Grid columns={{ md: "2", initial: "1" }} gap={"2"} mb={"6"}>
        <Flex direction={"column"} gap={"1"}>
          <Heading {...defaultTextProps}>Your personal analytics</Heading>
          <Text color={"gray"}>
            Welcome to your analytics. Here you can see trends and other fun
            data, which can help you see how your habits are forming.
          </Text>
        </Flex>
      </Grid>
    </FlexContainer>
  );
};

Analytics.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Analytics;
