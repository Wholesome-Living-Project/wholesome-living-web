import { UnstyledA, UnstyledLink } from "@/components/ui/UnstyledA";
import useBreakPoints from "@/hooks/useBreakPoints";
import {
  Flex,
  Container as RadixContainer,
  Separator,
  Text,
} from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { SPACING } from "../../theme/theme";

const Container = styled(Flex)`
  padding: ${SPACING * 4}px 0;
`;

const FooterLinks = styled(Flex)`
  margin: 0;
  padding: 0;
  align-items: flex-start;
  display: flex;
`;

type MenuItemProps = {
  link: string;
  onClick?: () => void;
} & PropsWithChildren;
const MenuItem = ({ link, children, onClick }: MenuItemProps) => (
  <UnstyledLink href={link}>
    <Text color={"gray"} highContrast onClick={link ? undefined : onClick}>
      {children}
    </Text>
  </UnstyledLink>
);

type RouteType = { link: string; text: string };
const routes: RouteType[] = [];

const Footer = () => {
  const { isLessThanMedium } = useBreakPoints();
  return (
    <Flex mt={"8"} direction={"column"}>
      <Separator size="4" />
      <RadixContainer mx={"4"}>
        <Container direction={"row"} justify={"between"} align={"center"}>
          <FooterLinks
            direction={isLessThanMedium ? "column" : "row"}
            justify={"between"}
            gap={"4"}
            grow={"1"}
          >
            {routes.map((route) => (
              <MenuItem key={route.text} link={route.link}>
                {route.text}
              </MenuItem>
            ))}
            <MenuItem link={"/about-us"}>About us</MenuItem>
            <MenuItem link={"/privacy-policy"}>Privacy Policy</MenuItem>
            <UnstyledA target={"_blank"} href={"https://www.uzh.ch"}>
              <Text color={"gray"} highContrast>
                UZH
              </Text>
            </UnstyledA>
            <UnstyledA
              target={"_blank"}
              href={"https://www.innovation.uzh.ch/"}
            >
              <Text color={"gray"} highContrast>
                Innovation Hub
              </Text>
            </UnstyledA>
          </FooterLinks>
        </Container>
      </RadixContainer>
    </Flex>
  );
};

export default Footer;
