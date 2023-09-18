import { UnstyledA } from "@/components/ui/UnstyledA";
import useBreakPoints from "@/hooks/useBreakPoints";
import useLightMode from "@/hooks/useLightMode";
import MainLayout from "@/layouts/main.layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ReactElement } from "react";
import styled from "styled-components";

const ImageContainer = styled(Flex)`
  position: relative;
`;

const CoverImage = styled(Image)`
  object-fit: contain;
`;

const Badge = styled(Image)`
  object-fit: contain;
`;

const BadgeGrid = styled(Grid)`
  height: 80px;
  position: relative;
  max-width: 400px;
`;

const BadgeContainer = styled(Flex)`
  position: relative;
`;

const WholesomeApp = () => {
  const { lightMode } = useLightMode();
  const { isLessThanMedium } = useBreakPoints();
  return (
    <Grid gap={"6"} columns={isLessThanMedium ? "1" : "2"}>
      <Flex direction={"column"} justify={"between"} gap={"6"}>
        <Heading color={"gray"} highContrast size={"9"}>
          The Wholesome Mobile App
        </Heading>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Seamless Habit Tracking on the Go
          </Text>
          <Text color={"gray"} size={"3"}>
            Explore the power of the Wholesome app, designed to fit seamlessly
            into your daily life, helping you effortlessly track and nurture
            your habits wherever you are. Discover how our intuitive app allows
            you to customize your habit tracking experience, ensuring that it
            aligns perfectly with your unique goals and preferences.
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Set Goals, Build Habits, See Results
          </Text>
          <Text color={"gray"} size={"3"}>
            Learn how the Wholesome app guides you through the process of
            setting meaningful goals, establishing healthy habits, and
            celebrating your progress as you achieve real results. Learn how the
            Wholesome app guides you through the process of setting meaningful
            goals, establishing healthy habits, and celebrating your progress as
            you achieve real results.
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"1"}>
          <Text color={"gray"} highContrast size={"5"}>
            Download Wholesome Today
          </Text>
          <Text color={"gray"} size={"3"}>
            Take action towards a healthier, more balanced life. Download the
            Wholesome app today and embark on a transformative journey of
            positive habit cultivation.
          </Text>
        </Flex>
        {isLessThanMedium && (
          <ImageContainer>
            <CoverImage
              src={"/assets/images/app_preview.png"}
              alt={"app preview"}
              width={300}
              height={300}
            />
          </ImageContainer>
        )}
        <BadgeGrid columns={"2"} gap={"4"}>
          <BadgeContainer>
            <UnstyledA
              href={"https://www.apple.com/app-store/"}
              target={"_blank"}
            >
              <Badge
                src={
                  lightMode
                    ? "/assets/images/app-store-badge-dark.png"
                    : "/assets/images/app-store-badge-light.png"
                }
                alt={"app store link"}
                fill
                sizes={"700px"}
              />
            </UnstyledA>
          </BadgeContainer>
          <BadgeContainer>
            <UnstyledA
              href={"https://play.google.com/store/"}
              target={"_blank"}
            >
              <Badge
                src={"/assets/images/google-play-store-badge.png"}
                alt={"app store link"}
                fill
                sizes={"700px"}
              />
            </UnstyledA>
          </BadgeContainer>
        </BadgeGrid>
      </Flex>

      {!isLessThanMedium && (
        <ImageContainer>
          <CoverImage
            src={"/assets/images/app_preview.png"}
            alt={"app preview"}
            fill
            sizes={"1500px"}
          />
        </ImageContainer>
      )}
    </Grid>
  );
};

WholesomeApp.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default WholesomeApp;
