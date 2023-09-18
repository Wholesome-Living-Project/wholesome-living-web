import Menu from "@mui/icons-material/Menu";

import { IconProps } from "@mui/material";
import styled from "styled-components";

type IconType = Omit<IconProps, "color"> & { color?: string };

const Icon = styled(Menu)<IconType>`
  color: ${(p) => p.color};
`;

const MenuIcon = (props: IconType) => {
  return <Icon {...props} />;
};

export default MenuIcon;
