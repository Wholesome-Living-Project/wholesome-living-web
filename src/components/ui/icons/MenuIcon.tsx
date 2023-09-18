import Menu from "@mui/icons-material/Menu";

import { IconProps } from "@mui/material";
import styled from "styled-components";

const Icon = styled(Menu)<IconProps>`
  color: ${(p) => p.color};
`;

const MenuIcon = (props: IconProps) => {
  return <Icon {...props} />;
};

export default MenuIcon;
