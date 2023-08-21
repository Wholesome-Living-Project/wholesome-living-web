import PluginList from "@/components/discover/PluginList";
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
        <Text color={"gray"} size={"7"} mb={"8"}>
          Wholesome is a habit tracker that helps you create and maintain health
          and financial habits.
        </Text>
        <Heading color={"gray"} highContrast size={"7"}>
          A Plugin based system
        </Heading>
        <Flex direction={"column"} mb={"6"}>
          <Text color={"gray"} size={"4"} mb={"4"}>
            Each habit you can track has an individual app. You can choose from
            a variety of apps to add to your dashboard.
          </Text>
          {
            // TODO: add plugin icons
          }
          <PluginList />
        </Flex>
        <Heading color={"gray"} highContrast size={"7"}>
          AI powered Coach for giving you personalized advice
        </Heading>
        <Text color={"gray"} size={"4"} mb={"8"}>
          Choose your AI coach and set up your app in no time. Your coach will
          ask you a few questions and then give you a tailored plan to help you
          achieve your goals.
        </Text>
        <Heading color={"gray"} highContrast size={"7"}>
          Intrinsic and extrinsic motivation through gamification and rewards
        </Heading>
        <Text color={"gray"} size={"4"} mb={"2"}>
          Each step you take towards your goal will be rewarded with experience
          points. In the beginning your forest is small, track your progress for
          each app to grow your trees and unlock new features.
        </Text>
      </Flex>
    </Grid>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
