import {
  Links,
  navigationAppLinks,
  navigationRootLinks,
} from "@/components/layout/Header";
import useLightMode from "@/hooks/useLightMode";
import { Popover } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type Props = { isHomeHeader?: boolean } & PropsWithChildren;
const MobileMenu = ({ children, isHomeHeader }: Props) => {
  const { lightMode } = useLightMode();
  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <Links
          links={isHomeHeader ? navigationRootLinks : navigationAppLinks}
          lightMode={lightMode}
          direction={"column"}
        />
      </Popover.Content>
    </Popover.Root>
  );
};

export default MobileMenu;
