import { Links, navigationRootLinks } from "@/components/layout/Header";
import useLightMode from "@/hooks/useLightMode";
import { Popover } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const MobileMenu = ({ children }: PropsWithChildren) => {
  const { lightMode } = useLightMode();
  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <Links links={navigationRootLinks} lightMode={lightMode} />
      </Popover.Content>
    </Popover.Root>
  );
};

export default MobileMenu;
