import { SettingsPluginName } from "@/api/openapi";
import PluginBanner from "@/components/discover/PluginBanner";
import OptionalWrapWith from "@/components/helpers/OptionalWrapWith";
import PlotWrapper, { DefaultPlotProps } from "@/components/plots/PlotWrapper";
import DashboardCard from "@/components/ui/DashboardCard";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import { PLUGIN_COLORS, PLUGINS } from "@/helpers/pluginList";
import useLightMode from "@/hooks/useLightMode";
import { alpha } from "@/theme/alpha";
import { COLORS } from "@/theme/theme";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode } from "react";
import {
  HorizontalGridLines,
  LineSeries,
  LineSeriesPoint,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import styled from "styled-components";

const CaptializedText = styled(Heading)`
  text-transform: uppercase;
`;

export type PlotProps = {
  data: (any[] | LineSeriesPoint)[];
  showInCard?: boolean;
  plugin: SettingsPluginName;
  icon: ReactNode;
  tag: string;
  description?: string;
  plotType?: "line" | "bar";
} & DefaultPlotProps &
  PropsWithChildren;

const Plot = ({
  data,
  showInCard,
  tag,
  description,
  plugin,
  icon,
  plotType = "line",
  ...rest
}: PlotProps) => {
  const { lightMode } = useLightMode();

  const gridStyle = {
    stroke: lightMode ? undefined : alpha(0.4, COLORS.WHITE),
    strokeWidth: 0.8,
  };

  return (
    <OptionalWrapWith wrap={showInCard} component={<DashboardCard />}>
      <Flex justify={"between"} mb={"4"}>
        <Flex direction={"column"} gap={"1"}>
          <CaptializedText {...defaultTextProps} size={"2"}>
            {tag}
          </CaptializedText>
          <Text color={"gray"} size={"2"}>
            {description}
          </Text>
        </Flex>
        <PluginBanner {...PLUGINS[plugin]} size={30} icon={icon} />
      </Flex>
      <PlotWrapper
        parentMargin={showInCard ? 10 : 0}
        parentGap={showInCard ? { x: 28, md: 28 } : { x: 0 }}
        {...rest}
      >
        <VerticalGridLines style={gridStyle} />
        <HorizontalGridLines style={gridStyle} />
        <XAxis style={gridStyle} />
        <YAxis style={gridStyle} />
        {data.length > 0 ? (
          plotType === "bar" ? (
            <VerticalBarSeries
              barWidth={0.6}
              data={data}
              color={PLUGIN_COLORS[plugin]}
            />
          ) : (
            <LineSeries data={data} color={PLUGIN_COLORS[plugin]} />
          )
        ) : (
          <CaptializedText {...defaultTextProps} size={"2"}>
            No Data
          </CaptializedText>
        )}
      </PlotWrapper>
    </OptionalWrapWith>
  );
};

export default Plot;
