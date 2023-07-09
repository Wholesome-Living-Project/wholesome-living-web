import { PluginType } from "@/helpers/pluginList";
import { alpha } from "@/theme/alpha";
import { COLORS, INNER_BORDER_RADIUS } from "@/theme/theme";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

const PluginContainer = styled.div<{ color?: string }>`
  box-shadow: 0 6px 8px ${alpha(0.5, COLORS.PRIMARY)};
  border-radius: ${INNER_BORDER_RADIUS}px;
  overflow: hidden;
`;

const Gradient = styled(Flex)<{ size?: number; color?: string }>`
  height: ${(p) => p.size ?? 50}px;
  width: ${(p) => p.size ?? 50}px;
  background: linear-gradient(
    90deg,
    ${(p) => p.color ?? COLORS.PRIMARY} 0%,
    ${(p) => (p.color ? alpha(0.6, p.color) : COLORS.PRIMARY)} 100%
  );
`;

// TODO ADD ICONS
const PluginBanner = ({
  color,
  icon,
  faIcon,
  materialIcon,
  ionIcon,
  size,
}: PluginType & { size?: number }) => {
  return (
    <PluginContainer>
      <Gradient
        size={50}
        color={color}
        justify={"center"}
        align={"center"}
        row
      ></Gradient>
    </PluginContainer>
  );
};

export default PluginBanner;
