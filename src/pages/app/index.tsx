import SummaryCard from "@/components/analytics/SummaryCard";
import FinanceHistory from "@/components/dashboard/FinanceHistory";
import MeditationHistory from "@/components/dashboard/MeditationHistory";
import Plot from "@/components/plots/Plot";
import ElevatorIcon from "@/components/ui/icons/ElevatorIcon";
import FinanceIcon from "@/components/ui/icons/FinanceIcon";
import MeditationIcon from "@/components/ui/icons/MeditationIcon";
import { getFormattedTime } from "@/helpers/getFormattedTime";
import AppLayout from "@/layouts/app.layout";
import { useElevator } from "@/providers/ElevatorProvider";
import { useFinance } from "@/providers/FinanceProvider";
import { useLevels } from "@/providers/LevelsProvider";
import { useMeditate } from "@/providers/MeditationProvider";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement, useCallback, useEffect } from "react";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
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
  const {
    spendingByWeekDay,
    saveSpending,
    getSpendings,
    loading,
    totalSavings,
  } = useFinance();

  const { meditationByWeekDay, totalMeditationTime, totalMeditationLastWeek } =
    useMeditate();

  const { totalStairs, heightByWeekDay, stairsByWeekDay } = useElevator();

  const createFinanceEntry = useCallback(async () => {
    const newEntry = {
      amount: 120,
      spendingTime: Math.round(new Date().getTime() / 1000),
      description: "work",
      saving: 30,
    };

    await saveSpending(newEntry);
    await getSpendings();
  }, [getSpendings, saveSpending]);

  const { levelMap, experienceMap } = useLevels();
  useEffect(() => {
    //console.log("Level Map:", levelMap);
    //console.log("Experience Map:", experienceMap);
  }, [levelMap, experienceMap]);

  const financeLevel = levelMap?.finance || 0;
  const meditationLevel = levelMap?.meditation || 0;
  const elevatorLevel = levelMap?.elevator || 0;

  return (
    <FlexContainer direction={"column"} gap={"6"}>
      <Grid gap={"4"} columns={{ initial: "1", sm: "2" }} mb={"6"}>
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
      <Grid columns={{ sm: "2", md: "4", initial: "1" }} gap={"6"}>
        <SummaryCard
          tag={"Total Savings"}
          plugin={"finance"}
          icon={<FinanceIcon color={"white"} fontSize={"small"} />}
        >
          {totalSavings} CHF
        </SummaryCard>
        <SummaryCard
          tag={"Total Time Meditated"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        >
          {getFormattedTime(totalMeditationTime)}
        </SummaryCard>
        <SummaryCard
          tag={"Total Stairs"}
          plugin={"elevator"}
          icon={<ElevatorIcon fontSize={"small"} />}
        >
          {totalStairs} Stairs
        </SummaryCard>

        <SummaryCard
          tag={"Meditation Last 7 days"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        >
          {getFormattedTime(totalMeditationLastWeek)}
        </SummaryCard>
      </Grid>
      <Grid columns={{ sm: "2", md: "4", initial: "1" }} gap={"6"}>
        <SummaryCard
          tag={"Finance Level"}
          plugin={"finance"}
          icon={<FinanceIcon color={"white"} fontSize={"small"} />}
        >
          {financeLevel}
        </SummaryCard>
        <SummaryCard
          tag={"Meditation Level"}
          plugin={"meditation"}
          icon={<MeditationIcon color={"white"} fontSize={"small"} />}
        >
          {meditationLevel}
        </SummaryCard>
        <SummaryCard
          tag={"Elevator Level"}
          plugin={"elevator"}
          icon={<ElevatorIcon fontSize={"small"} />}
        >
          {elevatorLevel}
        </SummaryCard>
      </Grid>

      <Grid columns={{ md: "2", initial: "1" }} gap={"6"}>
        <Plot
          width={{ x: "half", md: "full" }}
          plugin={"finance"}
          icon={<FinanceIcon color={"white"} fontSize={"small"} />}
          title={"Daily Spendings"}
          description={"Your spendings over the last week"}
          //@ts-ignore
          data={spendingByWeekDay}
          xType={"ordinal"}
          showInCard
          plotType={"bar"}
          loading={loading}
          tag={"7D"}
        />
        <Plot
          plugin={"meditation"}
          icon={<MeditationIcon fontSize={"small"} />}
          title={"Daily Meditations"}
          description={"Your meditations over the last week"}
          width={{ x: "half", md: "full" }}
          xType={"ordinal"}
          //@ts-ignore
          data={meditationByWeekDay}
          showDots
          showInCard
          loading={loading}
          tag={"7D"}
        />
        <Plot
          plugin={"elevator"}
          icon={<ElevatorIcon fontSize={"small"} />}
          title={"Daily Height"}
          description={"The total height you have used the stairs and elevator"}
          width={{ x: "half", md: "full" }}
          xType={"ordinal"}
          //@ts-ignore
          data={heightByWeekDay}
          plotType={"line"}
          showDots
          showInCard
          loading={loading}
          tag={"7D"}
        />
        <Plot
          plugin={"elevator"}
          icon={<ElevatorIcon fontSize={"small"} />}
          title={"Daily Stairs"}
          description={"The total stairs you have used"}
          width={{ x: "half", md: "full" }}
          xType={"ordinal"}
          //@ts-ignore
          data={stairsByWeekDay}
          plotType={"bar"}
          showDots
          showInCard
          loading={loading}
          tag={"7D"}
        />
      </Grid>
      <FinanceHistory tableMaxHeight={300} />
      <MeditationHistory tableMaxHeight={300} />
    </FlexContainer>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
