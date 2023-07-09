import { Flex, SPACING } from "axelra-styled-bootstrap-grid";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { COLORS, HEADER_HEIGHT } from "../../theme/theme";
import { Heading4 } from "../../theme/typography";
import OptionalLink from "../OptionalLink";
import { MaxWidthContainer } from "../ui/MaxWidthContainer";
import { UnstyledButton } from "../ui/UnstyledButton";

const FullWidthContainer = styled(Flex)`
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  background: ${COLORS.WHITE};
  flex-direction: row;
`;

const HeaderContent = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  letter-spacing: 4px;
`;

const HeaderLinks = styled(Flex)`
  gap: ${SPACING * 2}px;
  margin: 0;
  padding: 0;
`;

type MenuItemProps = {
  link?: string;
  onClick?: () => void;
} & PropsWithChildren;
const MenuItem = ({ link, children, onClick }: MenuItemProps) => (
  <OptionalLink href={link}>
    <UnstyledButton onClick={!link ? onClick : undefined}>
      <Heading4 color={COLORS.BLACK}>{children}</Heading4>
    </UnstyledButton>
  </OptionalLink>
);

type RouteType = { link: string; text: string };
const routes: RouteType[] = [];

const Header = () => {
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
          <MenuItem link={"/"}>Wholesome Living</MenuItem>
        </HeaderLinks>
      </HeaderContent>
    </FullWidthContainer>
  );
};

export default Header;
