import Stairs from "@mui/icons-material/Stairs";
import { IconProps } from "@mui/material";
import styled from "styled-components";

type IconType = Omit<IconProps, "color"> & { color?: string };

const Icon = styled(Stairs)<IconType>`
  color: ${(p) => p.color ?? "white"};
`;

const ElevatorIcon = (props: IconType) => {
  return <Icon {...props} />;
};

export default ElevatorIcon;
