import { COLORS, SIDE_BAR_WIDTH_SMALL, SPACING } from "@/theme/theme";

import OptionalLink from "@/components/OptionalLink";
import Divider from "@/components/ui/Divider";
import MeditationIcon from "@/components/ui/icons/MeditationIcon";
import MenuIcon from "@/components/ui/icons/MenuIcon";
import { UnstyledButton } from "@/components/ui/UnstyledButton";
import { alpha } from "@/theme/alpha";
import { Heading6 } from "@/theme/typography";
import { Flex } from "axelra-styled-bootstrap-grid";
import { cloneElement, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";

const MenuIconContainer = styled(UnstyledButton)`
  padding: ${SPACING * 2}px 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LinkContainer = styled(Flex)`
  padding: ${SPACING * 4}px 0;
  gap: ${SPACING * 2}px;
`;

const Container = styled(Flex)<{ open: boolean }>`
  background: ${COLORS.BACKGROUND_GREY};
  position: absolute;
  height: 100%;
  z-index: 1;
  width: ${(p) => (p.open ? "unset" : SIDE_BAR_WIDTH_SMALL)}px;
`;

type RouteType = { link: string; text: string; icon: ReactElement };
const routes: RouteType[] = [
  { link: "/", text: "Home", icon: <MeditationIcon /> },
  { link: "/settings", text: "Settings", icon: <MeditationIcon /> },
  { link: "/meditation", text: "Meditation", icon: <MeditationIcon /> },
  { link: "/finance", text: "Finance", icon: <MeditationIcon /> },
];

const IconProps = {
  color: COLORS.PRIMARY,
  size: 30,
};

const SideBar = () => {
  // TODO add animation with framer motion.
  const [open, setOpen] = useState(false);

  const handleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container column align={"center"} open={open}>
      <MenuIconContainer onClick={handleSidebar}>
        <MenuIcon {...IconProps} />
      </MenuIconContainer>

      <Divider color={alpha(0.2, COLORS.PRIMARY)} />
      <LinkContainer column>
        {routes.map((route, i) => (
          <OptionalLink href={route.link} key={i}>
            <Flex row>
              {cloneElement(route.icon, { ...IconProps })}{" "}
              {open && <Heading6>{route.text}</Heading6>}
            </Flex>
          </OptionalLink>
        ))}
      </LinkContainer>
    </Container>
  );
};

export default SideBar;
