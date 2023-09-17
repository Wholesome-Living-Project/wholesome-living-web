import { SettingsPluginName } from "@/api/openapi";
import PluginBanner from "@/components/discover/PluginBanner";
import OptionalWrapWith from "@/components/helpers/OptionalWrapWith";
import Plot, { DefaultPlotProps } from "@/components/plots/Plot";
import DashboardCard from "@/components/ui/DashboardCard";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import { PLUGIN_COLORS, PLUGINS } from "@/helpers/pluginList";
import useLightMode from "@/hooks/useLightMode";
import { alpha } from "@/theme/alpha";
import { COLORS } from "@/theme/theme";
import { Flex, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  HorizontalGridLines,
  LineSeries,
  LineSeriesPoint,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import styled from "styled-components";

const CaptializedText = styled(Heading)`
  text-transform: uppercase;
`;

export type LinePlotProps = {
  data: (any[] | LineSeriesPoint)[];
  showInCard?: boolean;
  plugin: SettingsPluginName;
  icon: ReactNode;
  tag: string;
} & DefaultPlotProps;

const LinePlot = ({
  data,
  showInCard,
  tag,
  plugin,
  icon,
  ...rest
}: LinePlotProps) => {
  const { lightMode } = useLightMode();

  const gridStyle = {
    stroke: lightMode ? undefined : alpha(0.4, COLORS.WHITE),
    strokeWidth: 0.8,
  };

  return (
    <OptionalWrapWith wrap={showInCard} component={<DashboardCard />}>
      <Flex justify={"between"} mb={"4"}>
        <CaptializedText {...defaultTextProps} size={"2"}>
          {tag}
        </CaptializedText>
        <PluginBanner {...PLUGINS[plugin]} size={30} icon={icon} />
      </Flex>
      <Plot
        parentMargin={showInCard ? 10 : 0}
        parentGap={showInCard ? { x: 28, md: 28 } : { x: 0 }}
        {...rest}
      >
        <VerticalGridLines style={gridStyle} />
        <HorizontalGridLines style={gridStyle} />
        <XAxis style={gridStyle} />
        <YAxis style={gridStyle} />
        <LineSeries data={data} color={PLUGIN_COLORS[plugin]} />
      </Plot>
    </OptionalWrapWith>
  );
};

export default LinePlot;
