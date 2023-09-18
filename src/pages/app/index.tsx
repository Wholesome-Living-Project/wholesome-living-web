import SummaryCard from "@/components/analytics/SummaryCard";
import { getLast7Days } from "@/components/helpers/getLast7Days";
import LinePlot from "@/components/plots/LinePlot";
import AppLayout from "@/layouts/app.layout";
import { useFinance } from "@/providers/FinanceProvider";
import CashIcon from "@mui/icons-material/AttachMoney";
import MeditationIcon from "@mui/icons-material/SelfImprovement";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
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

const Dashboard = () => {
  const { spendings, saveSpending, getSpendings } = useFinance();

  const spendingsByDate = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {};
    const dates = getLast7Days();

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0;
    });

    // Filter investments within the last seven days
    spendings.forEach((investment) => {
      if (!investment.spendingTime) return;
      let investmentDate = new Date(investment.spendingTime * 1000); // assuming spendingTime is a Unix timestamp, it is converted to JavaScript timestamp by multiplying by 1000
      let dateStr = investmentDate.toISOString().slice(0, 10); // converting date to string format "YYYY-MM-DD"
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += investment.amount || 0; // add the amount to the aggregate of the corresponding date
      }
    });

    let dayNames: { x: string; y: number }[] = [];

    for (let date in aggregates) {
      let day = new Date(date);
      let dayName = day.toLocaleDateString("en-US", { weekday: "short" }); // Change 'en-US' to your preferred locale if needed
      dayNames.push({ x: dayName, y: aggregates[date] });
    }

    return dayNames.reverse();
  }, [spendings]);

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
          icon={<Meditation fontSize={"small"} />}
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
          data={spendingsByDate}
          xType={"ordinal"}
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

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Dashboard;
