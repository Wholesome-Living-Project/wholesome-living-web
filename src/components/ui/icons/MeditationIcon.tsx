import Meditation from "@mui/icons-material/SelfImprovement";
import { IconProps } from "@mui/material";
import styled from "styled-components";

type IconType = Omit<IconProps, "color"> & { color?: string };

const Icon = styled(Meditation)<IconType>`
  color: ${(p) => p.color};
`;

const MeditationIcon = (props: IconType) => {
  return <Icon {...props} />;
};

export default MeditationIcon;
