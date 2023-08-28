import OptionalLink from "@/components/OptionalLink";
import useLightMode from "@/hooks/useLightMode";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { alpha } from "@/theme/alpha";
import { SPACING } from "@/theme/theme";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Button,
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
  $active: boolean;
  activecolor: string;
}>`
  padding: ${SPACING}px;
  border-radius: 4px;
  background: ${(p) => (p.$active ? p.activecolor : "transparent")};

  &:hover {
    background: ${(p) =>
      p.$active ? p.activecolor : (p) => p.theme.colors.gray4};
    cursor: pointer;
  }
`;

const HeaderLinkLabel = styled(Text)<{ $active: boolean; $lightMode: boolean }>`
  color: ${(p) => (p.$active ? p.theme.colors.gray1 : p.theme.colors.gray10)};
`;

type NavigationLinkType = {
  label: string;
  link: string;
};

const navigationAppLinks: NavigationLinkType[] = [
  {
    link: "/app",
    label: "Dashboard",
  },
  {
    link: "/app/analytics",
    label: "Analytics",
  },
];

const navigationRootLinks: NavigationLinkType[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/wholesome-app",
    label: "Wholesome App",
  },
  {
    link: "/about-us",
    label: "About Us",
  },
];

type Props = {
  isHomeHeader?: boolean;
};

const Header = ({ isHomeHeader }: Props) => {
  const { toggleLightMode, lightMode } = useLightMode();
  const router = useRouter();
  const theme = useTheme();
  const {
    createUserWithEmailAndPassword,
    signOutUser,
    signInWithEmailAndPassword,
    user,
  } = useAuthentication();

  return (
    <Flex mb={"6"} direction={"column"}>
      <RadixContainer my={"3"}>
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <OptionalLink href={"/"}>
            <Heading
              mr={"8"}
              color={"gray"}
              highContrast
              size={"8"}
              trim={"start"}
            >
              Wholesome
            </Heading>
          </OptionalLink>

          <Links
            links={isHomeHeader ? navigationRootLinks : navigationAppLinks}
            lightMode={lightMode}
          />

          <Flex gap={"6"} align={"center"}>
            {isHomeHeader && (
              <Flex gap={"3"}>
                <Button
                  onClick={() =>
                    signInWithEmailAndPassword({
                      email: "remus.nichiteanu@hotmail.com",
                      password: "123456",
                    })
                  }
                >
                  Login
                </Button>{" "}
                <Button
                  onClick={() =>
                    createUserWithEmailAndPassword({
                      email: "remus.nichiteanu123@hotmail.com",
                      password: "123456",
                      lastName: "Nichiteanu",
                      firstName: "Remus",
                      dateOfBirth: "2023-07-1996",
                    })
                  }
                >
                  Register
                </Button>
              </Flex>
            )}
            {!isHomeHeader && (
              <IconButton
                size={"3"}
                variant={"ghost"}
                onClick={() => signOutUser()}
              >
                <ExitIcon color={alpha(0.7, lightMode ? "black" : "white")} />
              </IconButton>
            )}
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
        </Flex>
      </RadixContainer>
      <Separator size="4" />
    </Flex>
  );
};

type LinksProps = {
  links: NavigationLinkType[];
  lightMode: boolean;
};
const Links = ({ links, lightMode }: LinksProps) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Flex direction={"row"} align={"center"} gap={"4"}>
      {links.map((navLink, i) => (
        <OptionalLink href={navLink.link} key={i}>
          <HeaderLink
            activecolor={
              lightMode ? theme.colors.blackA12 : theme.colors.whiteA12
            }
            $active={router.pathname === navLink.link}
          >
            <HeaderLinkLabel
              trim={"both"}
              weight={"medium"}
              $lightMode={lightMode}
              $active={router.pathname === navLink.link}
            >
              {navLink.label}
            </HeaderLinkLabel>
          </HeaderLink>
        </OptionalLink>
      ))}
    </Flex>
  );
};

export default Header;
