import Meditation from "@mui/icons-material/SelfImprovement";
import { IconProps } from "@mui/material";
import styled from "styled-components";

const Icon = styled(Meditation)<IconProps>`
  color: ${(p) => p.color};
`;

const MeditationIcon = (props: IconProps) => {
  return <Icon {...props} />;
};

export default MeditationIcon;
