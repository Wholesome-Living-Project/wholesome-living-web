import useBreakPoints from "@/hooks/useBreakPoints";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import styled from "styled-components";

const ImageContainer = styled(Flex)`
  position: relative;
`;

const Wrapper = styled(Grid)`
  min-height: 450px;
`;

const TextWRapper = styled(Flex)`
  position: relative;
`;

type Props = {
  title: string;
  text: string;
  src?: string;
  reverse?: boolean;
};
const TextWithImageSection = ({ text, src, reverse, title }: Props) => {
  const { isLessThanMedium } = useBreakPoints();
  return (
    <Wrapper gap={"6"} columns={isLessThanMedium ? "1" : "2"} mb={"4"}>
      {src && reverse && !isLessThanMedium && (
        <ImageContainer align={"center"}>
          <Image
            alt={""}
            src={src}
            objectFit={"contain"}
            fill={!isLessThanMedium}
            width={isLessThanMedium ? 300 : undefined}
            height={isLessThanMedium ? 300 : undefined}
            objectPosition={"left"}
          />
        </ImageContainer>
      )}
      <TextWRapper
        direction={"column"}
        py={"8"}
        pb={isLessThanMedium ? "0" : undefined}
        gap={"3"}
        justify={"center"}
        grow={"1"}
      >
        <Heading color={"gray"} highContrast size={"8"}>
          {title}
        </Heading>
        <Text color={"gray"} size={"5"} mb={isLessThanMedium ? "4" : "8"}>
          {text}
        </Text>
      </TextWRapper>
      {src && (!reverse || isLessThanMedium) && (
        <ImageContainer>
          <Image
            alt={""}
            src={src}
            objectFit={"contain"}
            fill={!isLessThanMedium}
            width={isLessThanMedium ? 300 : undefined}
            height={isLessThanMedium ? 300 : undefined}
            objectPosition={"center"}
          />
        </ImageContainer>
      )}
    </Wrapper>
  );
};

export default TextWithImageSection;
