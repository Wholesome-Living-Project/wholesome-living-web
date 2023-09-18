import OptionalLink from "@/components/OptionalLink";
import MobileMenu from "@/components/layout/MobileMenu";
import LoginForm from "@/components/ui/LoginForm";
import Modal from "@/components/ui/Modal";
import useBreakPoints from "@/hooks/useBreakPoints";
import useLightMode from "@/hooks/useLightMode";
import { useUser } from "@/hooks/useUser";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { alpha } from "@/theme/alpha";
import { SPACING } from "@/theme/theme";
import Burger from "@mui/icons-material/Menu";
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
import { useState } from "react";
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

const BurgerIcon = styled(Burger)<{ lightMode?: boolean }>`
  color: ${(p) => (p.lightMode ? "black" : "white")};
`;

const HeaderLinkLabel = styled(Text)<{ $active: boolean; $lightMode: boolean }>`
  color: ${(p) => (p.$active ? p.theme.colors.gray1 : p.theme.colors.gray10)};
`;

type NavigationLinkType = {
  label: string;
  link: string;
};

export const navigationAppLinks: NavigationLinkType[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/wholesome-app",
    label: "Wholesome App",
  },
  {
    link: "/app",
    label: "Dashboard",
  },
  /*{
    link: "/app/analytics",
    label: "Analytics",
  },*/
];

export const navigationRootLinks: NavigationLinkType[] = [
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

const Header = () => {
  const { toggleLightMode, lightMode } = useLightMode();
  const { firebaseUser } = useUser();
  const { signOutUser, signInWithEmailAndPassword } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLessThanMedium } = useBreakPoints();

  return (
    <Flex mb={"9"} direction={"column"}>
      <RadixContainer my={"3"} mx={"4"}>
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

          {isLessThanMedium ? (
            <MobileMenu
              isHomeHeader={!firebaseUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            >
              <BurgerIcon
                fontSize={"large"}
                color={"inherit"}
                lightMode={lightMode}
              />
            </MobileMenu>
          ) : (
            <>
              <Links
                links={!firebaseUser ? navigationRootLinks : navigationAppLinks}
                lightMode={lightMode}
              />
              <Flex gap={"6"} align={"center"}>
                {!firebaseUser &&
                  process.env.NEXT_PUBLIC_ACTIVATE_LOGIN_BUTTONS === "true" && (
                    <Flex gap={"3"}>
                      <Modal
                        title={"Login"}
                        description={
                          "Use your wholesome living account to log in"
                        }
                        content={
                          <LoginForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                          />
                        }
                        primaryButtonLabel={"Login"}
                        onPrimaryButtonClick={() =>
                          signInWithEmailAndPassword({
                            email: email,
                            password: password,
                          })
                        }
                        secondaryButtonLabel={"Cancel"}
                      >
                        <Button>Login</Button>
                      </Modal>
                    </Flex>
                  )}
                {firebaseUser && (
                  <IconButton
                    size={"3"}
                    variant={"ghost"}
                    onClick={() => signOutUser()}
                  >
                    <ExitIcon
                      color={alpha(0.7, lightMode ? "black" : "white")}
                    />
                  </IconButton>
                )}
                <IconButton
                  size={"3"}
                  variant={"ghost"}
                  onClick={() => toggleLightMode(!lightMode)}
                >
                  {lightMode ? (
                    <SunIcon color={alpha(0.7, "black")} />
                  ) : (
                    <MoonIcon color={alpha(0.7, "white")} />
                  )}
                </IconButton>
              </Flex>
            </>
          )}
        </Flex>
      </RadixContainer>
      <Separator size="4" />
    </Flex>
  );
};

type LinksProps = {
  links: NavigationLinkType[];
  lightMode: boolean;
  direction?: "row" | "column";
};
export const Links = ({ links, lightMode, direction }: LinksProps) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Flex direction={direction} align={"center"} gap={"4"}>
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
