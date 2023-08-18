import Menu from "@mui/icons-material/Menu";

import styled from "styled-components";

const Icon = styled(Menu)<IconProps>`
  color: ${(p) => p.color};
  font-size: ${(p) => p.size}px;
`;

const MenuIcon = (props: IconProps) => {
  return <Icon {...props} />;
};

export default MenuIcon;
