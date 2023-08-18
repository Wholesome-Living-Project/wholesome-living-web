import Meditation from "@mui/icons-material/SelfImprovement";
import styled from "styled-components";

const Icon = styled(Meditation)<IconProps>`
  color: ${(p) => p.color};
  font-size: ${(p) => p.size}px;
`;

const MeditationIcon = (props: IconProps) => {
  return <Icon {...props} />;
};

export default MeditationIcon;
