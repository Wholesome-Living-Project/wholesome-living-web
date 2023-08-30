import TextWithImageSection from "@/components/dashboard/TextWithImageSection";
import PluginList from "@/components/discover/PluginList";
import MainLayout from "@/layouts/main.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";

const Home = () => {
  return (
    <Grid gap={"4"} columns={"1"}>
      <Flex direction={"column"} justify={"between"} gap={"6"}>
        <Flex direction={"column"} gap={"3"}>
          <Heading color={"gray"} highContrast size={"9"}>
            Create wholesome habits
          </Heading>
          <Text color={"gray"} size={"7"} mb={"8"}>
            Wholesome is a habit tracker that helps you create and maintain
            health and financial habits.
          </Text>
        </Flex>

        <TextWithImageSection
          title={"Get personalized advice from your AI Coach"}
          text={
            "Choose your AI coach and set up your app in no time. Your coach will ask you a few questions and then give you a tailored plan to help you achieve your goals."
          }
          src={"/assets/images/ai_powered.png"}
        />
        <Flex direction={"column"} gap={"3"} mb={"6"}>
          <Heading color={"gray"} highContrast size={"8"}>
            A Plugin based system
          </Heading>
          <Flex direction={"column"} mb={"6"} gap={"4"}>
            <Text color={"gray"} size={"5"} mb={"4"}>
              Each habit you can track has an individual app. You can choose
              from a variety of apps to add to your dashboard.
            </Text>
            <PluginList />
          </Flex>
        </Flex>
        <TextWithImageSection
          title={
            "Intrinsic and Extrinsic motivation through Gamification and Rewards"
          }
          text={
            "Each step you take towards your goal will be rewarded with experience points. In the beginning your forest is small, track your progress for each app to grow your trees and unlock new features."
          }
          src={"/assets/images/gamification.png"}
          reverse
        />
      </Flex>
    </Grid>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
