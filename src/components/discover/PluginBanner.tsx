import { PluginType } from "@/helpers/pluginList";
import { alpha } from "@/theme/alpha";
import { COLORS, INNER_BORDER_RADIUS } from "@/theme/theme";
import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

const Gradient = styled(Flex)<{ size?: number; color?: string }>`
  height: ${(p) => p.size ?? 50}px;
  width: ${(p) => p.size ?? 50}px;
  box-shadow: 0 1px 4px 1px ${alpha(0.2, COLORS.PRIMARY)};
  border-radius: ${INNER_BORDER_RADIUS}px;
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
  size,
}: PluginType & { size?: number }) => {
  return (
    <Gradient
      size={size}
      color={color}
      justify={"center"}
      align={"center"}
      direction={"row"}
    >
      {icon}
    </Gradient>
  );
};

export default PluginBanner;
