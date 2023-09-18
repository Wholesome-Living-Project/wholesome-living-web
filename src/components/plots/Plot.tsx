import { SettingsPluginName } from "@/api/openapi";
import DashboardCardHeader from "@/components/dashboard/DashboardCardHeader";
import OptionalWrapWith from "@/components/helpers/OptionalWrapWith";
import PlotWrapper, { DefaultPlotProps } from "@/components/plots/PlotWrapper";
import { CaptializedText } from "@/components/ui/CapitalizedText";
import DashboardCard from "@/components/ui/DashboardCard";
import LoadingCard from "@/components/ui/LoadingCard";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import { PLUGIN_COLORS } from "@/helpers/pluginList";
import useLightMode from "@/hooks/useLightMode";
import { alpha } from "@/theme/alpha";
import { COLORS } from "@/theme/theme";
import { Flex } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import {
  Crosshair,
  HorizontalGridLines,
  LineSeries,
  LineSeriesPoint,
  MarkSeries,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

export type PlotProps = {
  data: (any[] | LineSeriesPoint)[];
  showInCard?: boolean;
  plugin: SettingsPluginName;
  icon: ReactNode;
  title: string;
  tag?: string;
  description?: string;
  plotType?: "line" | "bar";
  showDots?: boolean;
  loading?: boolean;
} & DefaultPlotProps &
  PropsWithChildren;

const Plot = ({
  data,
  showInCard,
  title,
  tag,
  description,
  plugin,
  icon,
  showDots,
  loading,
  plotType = "line",
  ...rest
}: PlotProps) => {
  const { lightMode } = useLightMode();
  const [crosshairValues, setCrosshairValues] = useState<
    any[] | (any[] & LineSeriesPoint) | undefined
  >();

  const gridStyle = useMemo(
    () => ({
      stroke: lightMode ? undefined : alpha(0.4, COLORS.WHITE),
      strokeWidth: 0.8,
    }),
    [lightMode]
  );

  const crosshairStyle = useMemo(
    () => ({
      box: { backgroundColor: "white" },
      line: {
        backgroundColor: lightMode ? "black" : "white",
        opacity: 0.5,
      },
      title: {
        fontSize: 12,
      },
    }),
    [lightMode]
  );

  if (loading) return <LoadingCard />;

  return (
    <OptionalWrapWith wrap={showInCard} component={<DashboardCard />}>
      <DashboardCardHeader
        plugin={plugin}
        title={title}
        icon={icon}
        tag={tag}
        description={description}
      />
      {data.length > 0 ? (
        <PlotWrapper
          parentMargin={showInCard ? 10 : 0}
          parentGap={showInCard ? { x: 28, md: 28 } : { x: 0 }}
          {...rest}
        >
          <VerticalGridLines style={gridStyle} />
          <HorizontalGridLines style={gridStyle} />
          <XAxis style={gridStyle} />
          <YAxis style={gridStyle} />

          {plotType === "bar" ? (
            <VerticalBarSeries
              barWidth={0.6}
              data={data}
              color={PLUGIN_COLORS[plugin]}
              onValueMouseOver={(value) => setCrosshairValues([value])}
              onValueMouseOut={() => setCrosshairValues(undefined)}
            />
          ) : (
            <LineSeries data={data} color={PLUGIN_COLORS[plugin]} />
          )}
          {plotType === "line" && showDots && (
            <MarkSeries
              data={data}
              onValueMouseOver={(value) => setCrosshairValues([value])}
              onValueMouseOut={() => setCrosshairValues(undefined)}
              color={PLUGIN_COLORS[plugin]}
            />
          )}

          <Crosshair values={crosshairValues} style={crosshairStyle} />
        </PlotWrapper>
      ) : (
        <Flex
          align={"center"}
          justify={"center"}
          grow={"1"}
          direction={"column"}
        >
          <CaptializedText {...defaultTextProps} size={"4"}>
            No Data
          </CaptializedText>
        </Flex>
      )}
    </OptionalWrapWith>
  );
};

export default Plot;
