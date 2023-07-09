import { Flex, SPACING } from "axelra-styled-bootstrap-grid";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import {
  COLORS,
  HEADER_HEIGHT,
  OUTER_BORDER_RADIUS,
  SIDEBAR_WIDTH,
} from "../../theme/theme";
import { Heading6 } from "../../theme/typography";
import OptionalLink from "../OptionalLink";

const FullWidthContainer = styled(Flex)`
  z-index: 10;
  height: ${HEADER_HEIGHT}px;
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  width: 100%;
  border: solid 1px ${COLORS.GREY};

  //NORMAL
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    z-index: 10;
    height: calc(100% - ${HEADER_HEIGHT}px);
    width: ${SIDEBAR_WIDTH}px;
    //flex-direction: row; //centered
    flex-direction: column; //top
    position: absolute;
  }
`;

const HeaderContent = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${SPACING * 2}px;
  flex-wrap: wrap;
  //padding-right: 112px;
  //margin-left: -40px;
`;

const HeaderLinks = styled(Flex)`
  gap: ${SPACING}px;
  margin: 0;
  padding: 0;
  letter-spacing: 2px;
  flex-wrap: wrap;
  // remove gap between elements
  grid-row-gap: 0;

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: ${SPACING * 4}px;
    letter-spacing: 4px;
  }
`;

type MenuItemProps = {
  link?: string;
  onPress?: () => void;
} & PropsWithChildren;
const MenuItem = ({ link, children, onPress }: MenuItemProps) => (
  <OptionalLink href={link}>
    <Heading6 color={COLORS.BLACK} onClick={link ? undefined : onPress}>
      {children}
    </Heading6>
  </OptionalLink>
);

type RouteType = { link: string; text: string };
const routes: RouteType[] = [
  { link: "/", text: "Home" },
  { link: "/settings", text: "Settings" },
  { link: "/meditation", text: "Meditation" },
  { link: "/finance", text: "Finance" },
];

const SideBar = () => {
  // TODO actually add this to the react lifecycle through redux or some other hook
  return (
    <FullWidthContainer row align={"center"}>
      <HeaderContent>
        <HeaderLinks row>
          {routes.map((route) => (
            <MenuItem key={route.text} link={route.link}>
              {route.text}
            </MenuItem>
          ))}
        </HeaderLinks>
      </HeaderContent>
    </FullWidthContainer>
  );
};

export default SideBar;
