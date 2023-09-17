import SummaryCard from "@/components/analytics/SummaryCard";
import LinePlot from "@/components/plots/LinePlot";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import AppLayout from "@/layouts/app.layout";
import { useFinance } from "@/providers/FinanceProvider";
import CashIcon from "@mui/icons-material/AttachMoney";
import MeditationIcon from "@mui/icons-material/SelfImprovement";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement, useCallback, useMemo } from "react";
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

const data = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

const Analytics = () => {
  const { spendings, saveSpending, getSpendings } = useFinance();

  const financeData = useMemo(() => {
    return spendings
      .filter(
        (spending) => spending && spending.amount && spending.spendingTime
      )
      .sort((a, b) =>
        a.spendingTime && b.spendingTime ? a.spendingTime - b.spendingTime : 1
      )
      .map((spending) => ({
        x: new Date(spending.spendingTime * 1000),
        y: spending.amount,
      }));
  }, [spendings]);
  console.log(financeData);

  const createFinanceEntry = useCallback(async () => {
    const newEntry = {
      amount: 60,
      spendingTime: Math.round(new Date("09/15/2023").getTime() / 1000),
      description: "clothing",
      saving: 5,
    };

    await saveSpending(newEntry);
    await getSpendings();
  }, [getSpendings, saveSpending]);

  return (
    <FlexContainer direction={"column"} gap={"2"}>
      <Button onClick={createFinanceEntry}>
        <Text color={"gray"}>Test</Text>
      </Button>
      <Grid columns={{ md: "2", initial: "1" }} gap={"2"} mb={"6"}>
        <Flex direction={"column"} gap={"1"}>
          <Heading {...defaultTextProps}>Your personal analytics</Heading>
          <Text color={"gray"}>
            Welcome to your analytics. Here you can see trends and other fun
            data, which can help you see how your habits are forming.
          </Text>
        </Flex>
      </Grid>
      <Grid columns={{ sm: "2", md: "4", initial: "1" }} gap={"6"} mb={"6"}>
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<Meditation fontSize={"small"} />}
        />
        <SummaryCard
          tag={"Total Savings"}
          plugin={"finance"}
          icon={<Cash fontSize={"small"} />}
        />
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<Meditation fontSize={"small"} />}
        />
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<Meditation fontSize={"small"} />}
        />
      </Grid>
      <Grid columns={{ md: "2", initial: "1" }} gap={"6"} mb={"6"}>
        <LinePlot
          width={{ x: "half", md: "full" }}
          plugin={"finance"}
          icon={<Cash fontSize={"small"} />}
          tag={"Total Spendings"}
          //@ts-ignore
          data={financeData}
          xType={"time"}
          showInCard
        />
        <LinePlot
          plugin={"meditation"}
          icon={<Meditation fontSize={"small"} />}
          tag={"Total Spendings"}
          width={{ x: "half", md: "full" }}
          data={data}
          showInCard
        />
      </Grid>
    </FlexContainer>
  );
};

Analytics.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Analytics;
