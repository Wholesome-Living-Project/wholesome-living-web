import SummaryCard from "@/components/analytics/SummaryCard";
import Plot from "@/components/plots/Plot";
import MeditationIcon from "@/components/ui/icons/MeditationIcon";
import AppLayout from "@/layouts/app.layout";
import { useFinance } from "@/providers/FinanceProvider";
import CashIcon from "@mui/icons-material/AttachMoney";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement, useCallback } from "react";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
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

const Dashboard = () => {
  const { spendingsByDate, saveSpending, getSpendings } = useFinance();

  const createFinanceEntry = useCallback(async () => {
    const newEntry = {
      amount: 120,
      spendingTime: Math.round(new Date().getTime() / 1000),
      description: "work",
      saving: 10,
    };

    await saveSpending(newEntry);
    await getSpendings();
  }, [getSpendings, saveSpending]);

  return (
    <FlexContainer direction={"column"} gap={"2"}>
      <Grid gap={"4"} columns={"2"} mb={"6"}>
        <Flex direction={"column"} justify={"between"} gap={"1"}>
          <Heading color={"gray"} highContrast>
            Welcome Back
          </Heading>
          <Text color={"gray"}>
            This is your dashboard. It acts as a summary of your progress and as
            a hub for your habits.
          </Text>
        </Flex>
      </Grid>
      <Grid columns={{ sm: "2", md: "4", initial: "1" }} gap={"6"} mb={"6"}>
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        >
          30 min
        </SummaryCard>
        <SummaryCard
          tag={"Total Savings"}
          plugin={"finance"}
          icon={<Cash fontSize={"small"} />}
        >
          232 CHF
        </SummaryCard>
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        />
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        />
      </Grid>
      <Grid columns={{ md: "2", initial: "1" }} gap={"6"} mb={"6"}>
        <Plot
          width={{ x: "half", md: "full" }}
          plugin={"finance"}
          icon={<Cash fontSize={"small"} />}
          tag={"Total Spendings"}
          description={"Your spendings over the last week"}
          //@ts-ignore
          data={spendingsByDate}
          xType={"ordinal"}
          showInCard
          plotType={"bar"}
        />
        <Plot
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
          tag={"Total Spendings"}
          width={{ x: "half", md: "full" }}
          data={data}
          showInCard
        />
      </Grid>
    </FlexContainer>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
