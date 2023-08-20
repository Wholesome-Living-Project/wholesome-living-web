import MainLayout from "@/layouts/main.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";

const AboutUs = () => {
  return (
    <Grid gap={"4"} columns={"1"}>
      <Flex direction={"column"} justify={"between"} gap={"6"}>
        <Heading color={"gray"} highContrast size={"9"}>
          About Us
        </Heading>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Welcome to wholesome
          </Text>
          <Text color={"gray"} size={"3"}>
            Hey there, welcome to Wholesome! We're a bunch of buddies from the
            University of Zurich (UZH) who got together for a master's project
            that turned into something awesome. Our goal? Creating a habit
            tracking app that's not just about counting steps or bucks, but
            about nailing those life goals while having a blast.
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Our Journey
          </Text>
          <Text color={"gray"} size={"3"}>
            Picture this: five students with different skills and a shared itch
            for making a real impact. We met at UZH and clicked instantly. From
            finance geeks to tech nerds and design fanatics, we realized life is
            all about balance – financially, mentally, and all that jazz. So, we
            decided to cook up an app that covers all bases.
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Our Mission
          </Text>
          <Text color={"gray"} size={"3"}>
            Here at Wholesome, we're all about giving you the superpowers to
            boss your life. It's not just about going for a jog or saving a few
            coins. It's about nailing those habits that make life awesome. Our
            app is like that buddy who's always got your back, reminding you to
            hustle for your dreams and giving you high-fives when you crush your
            goals.
          </Text>
        </Flex>

        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Come Join the Party
          </Text>
          <Text color={"gray"} size={"3"}>
            {"We're still jazzing up Wholesome, and we want you to be part of the action. Whether you're aiming to be the finance guru or the health freak, we've got your back. Your ideas and vibes are what make Wholesome awesome, and we're all ears for your thoughts." +
              "\n" +
              "\n" +
              "Big thanks for being part of the Wholesome crew. Let's crush some goals, break a sweat, and high-five life together!" +
              "\n" +
              "\n" +
              "Stay awesome,\n" +
              "The Wholesome Squad"}
          </Text>
        </Flex>
      </Flex>
    </Grid>
  );
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutUs;
