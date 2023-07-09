import { ResponsiveSpacer } from "axelra-react-utilities";
import { Flex } from "axelra-styled-bootstrap-grid";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { COLORS } from "../../theme/theme";
import { Regular } from "../../theme/typography";
import OptionalLink from "../OptionalLink";
import { MaxWidthContainer } from "../ui/MaxWidthContainer";

const FooterContent = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  letter-spacing: 4px;
`;

const FooterLinks = styled(Flex)`
  margin: 0;
  padding: 0;
  align-items: flex-start;
  display: flex;
`;

type MenuItemProps = {
  link?: string;
  onClick?: () => void;
} & PropsWithChildren;
const MenuItem = ({ link, children, onClick }: MenuItemProps) => (
  <OptionalLink href={link}>
    <Regular color={COLORS.BLACK} onClick={link ? undefined : onClick}>
      {children}
    </Regular>
  </OptionalLink>
);

type RouteType = { link: string; text: string };
const routes: RouteType[] = [];

const Footer = () => {
  return (
    <MaxWidthContainer>
      <ResponsiveSpacer x={4} lg={8} />
      <FooterContent>
        <FooterLinks column>
          {routes.map((route) => (
            <MenuItem key={route.text} link={route.link}>
              {route.text}
            </MenuItem>
          ))}
          <MenuItem link={"/"}>About us</MenuItem>
          <MenuItem link={"/"}>FAQ</MenuItem>
          <MenuItem link={"/"}>Privacy Policy</MenuItem>
        </FooterLinks>

        <MenuItem link={"/"}>ZKB</MenuItem>
      </FooterContent>
    </MaxWidthContainer>
  );
};

export default Footer;
