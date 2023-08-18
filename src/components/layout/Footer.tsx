import { Flex } from "axelra-styled-bootstrap-grid";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { COLORS, SPACING } from "../../theme/theme";
import { Regular } from "../../theme/typography";
import OptionalLink from "../OptionalLink";
import { MaxWidthContainer } from "../ui/MaxWidthContainer";

const Container = styled(Flex)`
  padding: ${SPACING * 4}px 0;
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
      <Container row justify={"space-between"}>
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
      </Container>
    </MaxWidthContainer>
  );
};

export default Footer;
