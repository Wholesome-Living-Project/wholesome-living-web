import {
  Links,
  navigationAppLinks,
  navigationRootLinks,
} from "@/components/layout/Header";
import LoginForm from "@/components/ui/LoginForm";
import Modal from "@/components/ui/Modal";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import useLightMode from "@/hooks/useLightMode";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { Button, Flex, Popover, Text } from "@radix-ui/themes";
import { PropsWithChildren, useState } from "react";

type Props = {
  isHomeHeader?: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  emailHint?: string;
  login?: () => Promise<void>;
  passwordHint?: string;
  loading?: boolean;
} & PropsWithChildren;
const MobileMenu = ({
  setPassword,
  password,
  email,
  setEmail,
  isHomeHeader,
  passwordHint,
  emailHint,
  login,
  loading,
  children,
}: Props) => {
  const { lightMode } = useLightMode();
  const { signOutUser } = useAuthentication();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={(st) => setOpen(st)}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <Flex
          direction={"column"}
          gap={"6"}
          justify={"center"}
          align={"center"}
        >
          <Links
            links={isHomeHeader ? navigationRootLinks : navigationAppLinks}
            lightMode={lightMode}
            direction={"column"}
          />
          {isHomeHeader &&
            process.env.NEXT_PUBLIC_ACTIVATE_LOGIN_BUTTONS === "true" && (
              <Flex gap={"3"}>
                <Modal
                  title={"Login"}
                  description={"Use your wholesome living account to log in"}
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
                  onPrimaryButtonClick={async () => {
                    await login?.();
                    setOpen(false);
                  }}
                  secondaryButtonLabel={"Cancel"}
                  loading={loading}
                >
                  <Button variant={"ghost"} size={"3"}>
                    Login
                  </Button>
                </Modal>
              </Flex>
            )}
          {!isHomeHeader && (
            <Button
              size={"3"}
              variant={"ghost"}
              onClick={() => {
                signOutUser();
                setOpen(false);
              }}
            >
              <Flex direction={"row"} gap={"1"} align={"center"}>
                <Text {...defaultTextProps}>Logout</Text>
              </Flex>
            </Button>
          )}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default MobileMenu;
