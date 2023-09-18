import MobileMenu from "@/components/layout/MobileMenu";
import LoginForm from "@/components/ui/LoginForm";
import Modal from "@/components/ui/Modal";
import { UnstyledLink } from "@/components/ui/UnstyledA";
import { validateEmail } from "@/helpers/validateEmail";
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
import { useCallback, useState } from "react";
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
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHint, setEmailHint] = useState<string>("");
  const [passwordHint, setPasswordHint] = useState<string>("");

  const { isLessThanMedium } = useBreakPoints();

  const login = useCallback(async () => {
    if (!validateEmail(email)) {
      setEmailHint("Please enter a valid email address.");
      throw "Invalid email";
    } else {
      if (emailHint) setEmailHint("");
    }
    if (password.length === 0) {
      setPasswordHint("Please enter a valid password.");
      throw "Invalid password";
    } else {
      if (passwordHint) setPasswordHint("");
    }
    setLoadingLogin(true);
    const user = await signInWithEmailAndPassword({
      email: email,
      password: password,
    });
    setLoadingLogin(false);
    if (!user) {
      setPasswordHint("Email or password is incorrect");
      throw "No user found";
    } else {
      if (passwordHint) setPasswordHint("");
    }

    await router.push("/app");
  }, [
    email,
    emailHint,
    password,
    passwordHint,
    router,
    signInWithEmailAndPassword,
  ]);

  return (
    <Flex mb={"9"} direction={"column"}>
      <RadixContainer mt={"4"} mb={"3"} mx={"4"}>
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <Flex direction={"row"} align={"end"} gap={"2"} justify={"start"}>
            <UnstyledLink href={"/"}>
              <Heading
                color={"gray"}
                highContrast
                size={"8"}
                trim={"start"}
                style={{
                  userSelect: "none",
                }}
              >
                Wholesome
              </Heading>
            </UnstyledLink>

            <Heading
              color={"gray"}
              size={"3"}
              style={{
                visibility: router.pathname === "/app" ? "visible" : "collapse",
                cursor: "default",
                userSelect: "none",
              }}
            >
              Analytics
            </Heading>
          </Flex>

          {isLessThanMedium ? (
            <MobileMenu
              isHomeHeader={!firebaseUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              emailHint={emailHint}
              passwordHint={passwordHint}
              login={login}
              loading={loadingLogin}
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
                        loading={loadingLogin}
                        content={
                          <LoginForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            emailHint={emailHint}
                            passwordHint={passwordHint}
                          />
                        }
                        primaryButtonLabel={"Login"}
                        onPrimaryButtonClick={login}
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
        <UnstyledLink href={navLink.link} key={i}>
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
        </UnstyledLink>
      ))}
    </Flex>
  );
};

export default Header;
