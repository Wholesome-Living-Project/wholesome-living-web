import OptionalLink from "@/components/OptionalLink";
import useLightMode from "@/hooks/useLightMode";
import { alpha } from "@/theme/alpha";
import { SPACING } from "@/theme/theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Heading,
  IconButton,
  Container as RadixContainer,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";

const HeaderLink = styled.div<{
  active: boolean;
  activeColor: string;
  lightMode: boolean;
}>`
  padding: ${SPACING}px;
  border-radius: 4px;
  background: ${(p) => (p.active ? p.activeColor : "transparent")};

  &:hover {
    background: ${(p) =>
      p.active ? p.activeColor : (p) => p.theme.colors.gray4};
    cursor: pointer;
  }
`;

const HeaderLinkLabel = styled(Text)<{ active: boolean; lightMode: boolean }>`
  color: ${(p) => (p.active ? p.theme.colors.gray1 : p.theme.colors.gray10)};
`;

type NavigationLinkType = {
  label: string;
  link: string;
};

const navigationLinks: NavigationLinkType[] = [
  {
    link: "/",
    label: "Dashboard",
  },
  {
    link: "/analytics",
    label: "Analytics",
  },
  {
    link: "/about-us",
    label: "About Us",
  },
];

const Header = () => {
  const { toggleLightMode, lightMode } = useLightMode();
  const router = useRouter();
  const theme = useTheme();

  return (
    <Flex mb={"6"} direction={"column"}>
      <RadixContainer my={"2"}>
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <Flex direction={"row"} align={"center"} gap={"3"}>
            <Heading
              mr={"8"}
              color={"gray"}
              highContrast
              size={"8"}
              trim={"start"}
            >
              Wholesome
            </Heading>
            {navigationLinks.map((navLink, i) => (
              <OptionalLink href={navLink.link} key={i}>
                <HeaderLink
                  activeColor={
                    lightMode ? theme.colors.blackA12 : theme.colors.whiteA12
                  }
                  lightMode={lightMode}
                  active={router.pathname === navLink.link}
                >
                  <HeaderLinkLabel
                    trim={"both"}
                    weight={"medium"}
                    lightMode={lightMode}
                    active={router.pathname === navLink.link}
                  >
                    {navLink.label}
                  </HeaderLinkLabel>
                </HeaderLink>
              </OptionalLink>
            ))}
          </Flex>
          <IconButton
            size={"3"}
            variant={"ghost"}
            onClick={() => toggleLightMode()}
          >
            {lightMode ? (
              <SunIcon color={alpha(0.7, "black")} />
            ) : (
              <MoonIcon color={alpha(0.7, "white")} />
            )}
          </IconButton>
        </Flex>
      </RadixContainer>
      <Separator size="4" />
    </Flex>
  );
};

export default Header;
