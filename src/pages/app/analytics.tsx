import SummaryCard from "@/components/analytics/SummaryCard";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import AppLayout from "@/layouts/app.layout";
import CashIcon from "@mui/icons-material/AttachMoney";
import MeditationIcon from "@mui/icons-material/SelfImprovement";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
`;

const Meditation = styled(MeditationIcon)`
  color: white;
`;

const Cash = styled(CashIcon)`
  color: white;
`;

const Analytics = () => {
  return (
    <FlexContainer direction={{ sm: "column", initial: "row" }} gap={"2"}>
      <Grid columns={"2"} gap={"2"} mb={"6"}>
        <Flex direction={"column"} gap={"1"}>
          <Heading {...defaultTextProps}>Your personal analytics</Heading>
          <Text color={"gray"}>
            Welcome to your analytics. Here you can see trends and other fun
            data, which can help you see how your habits are forming.
          </Text>
        </Flex>
      </Grid>
      <Grid columns={"4"} gap={"6"}>
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<Meditation />}
        />
        <SummaryCard tag={"Total Savings"} plugin={"finance"} icon={<Cash />} />
        <SummaryCard tag={"Total Time Meditated"} icon={<Meditation />} />
        <SummaryCard tag={"Total Time Meditated"} icon={<Meditation />} />
      </Grid>
      {/*<MeditationView />*/}
    </FlexContainer>
  );
};

Analytics.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Analytics;
