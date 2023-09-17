import useDimensions from "@/hooks/useDimensions";
import {
  LARGE_DEVICES_BREAK_POINT,
  MEDIUM_DEVICES_BREAK_POINT,
  SMALL_DEVICES_BREAK_POINT,
} from "@/theme/constants";
import { PropsWithChildren, useMemo } from "react";
import { XYPlot, XYPlotProps } from "react-vis";

const PAGE_MARGIN = 32;
const PAGE_MAX_WIDTH_INCLUDING_MARGIN = 1168;

enum sizes {
  sm = "sm",
  md = "md",
  lg = "lg",
  x = "x",
}

type PlotWidths = number | "full" | "threeQuarters" | "half" | "quarter";

export type DefaultPlotProps = {
  width: {
    [key in sizes]?: PlotWidths;
  } & {
    x: PlotWidths;
  };
  height?: number;
  showInCard?: boolean;
} & Omit<XYPlotProps, "width" | "height">;

type PlotParentProps = {
  parentMargin?: number;
  parentGap?: { [key in sizes]?: number } & {
    x: number;
  };
};

// This is an abstracted primitive inherited by all custom plots laying the foundation for plot components
const Plot = ({
  width,
  height = 300,
  parentMargin,
  parentGap,
  children,
  ...rest
}: DefaultPlotProps & PlotParentProps & PropsWithChildren) => {
  const { width: windowWidth } = useDimensions();

  const widthConfig = useMemo(() => {
    if (!windowWidth) return "x";
    if (windowWidth < SMALL_DEVICES_BREAK_POINT && width.sm) return "sm";
    if (windowWidth < MEDIUM_DEVICES_BREAK_POINT) return width.md ? "md" : "sm";
    if (windowWidth < LARGE_DEVICES_BREAK_POINT)
      return width.lg ? "lg" : width.md ? "md" : "sm";
    return "x";
  }, [width.lg, width.md, width.sm, windowWidth]);

  const gapConfig = useMemo(() => {
    if (!windowWidth) return "x";
    if (windowWidth < SMALL_DEVICES_BREAK_POINT && parentGap?.sm) return "sm";
    if (windowWidth < MEDIUM_DEVICES_BREAK_POINT)
      return parentGap?.md ? "md" : "sm";
    if (windowWidth < LARGE_DEVICES_BREAK_POINT)
      return parentGap?.lg ? "lg" : parentGap?.md ? "md" : "sm";
    return "x";
  }, [parentGap?.lg, parentGap?.md, parentGap?.sm, windowWidth]);

  // actually compute a pixel value for the plot width depending on the window width and the width config
  const computedWidth = useMemo(() => {
    const configWidth = width[widthConfig];
    if (!windowWidth || !configWidth) return 0;
    if (typeof configWidth === "string") {
      switch (configWidth) {
        case "full":
          return (
            Math.min(windowWidth, PAGE_MAX_WIDTH_INCLUDING_MARGIN) -
            PAGE_MARGIN -
            (parentMargin ? parentMargin * 2 : 0)
          );
        case "threeQuarters":
          return (
            (Math.min(windowWidth, PAGE_MAX_WIDTH_INCLUDING_MARGIN) -
              PAGE_MARGIN -
              (parentMargin ? parentMargin * 2 : 0)) *
            0.75
          );
        case "half":
          return (
            (Math.min(windowWidth, PAGE_MAX_WIDTH_INCLUDING_MARGIN) -
              PAGE_MARGIN -
              (parentMargin ? parentMargin * 2 : 0)) *
            0.5
          );
        default:
          return (
            (Math.min(windowWidth, PAGE_MAX_WIDTH_INCLUDING_MARGIN) -
              PAGE_MARGIN -
              (parentMargin ? parentMargin * 2 : 0)) *
            0.25
          );
      }
    } else {
      return configWidth;
    }
  }, [parentMargin, width, widthConfig, windowWidth]);

  return (
    <XYPlot
      {...rest}
      height={height}
      width={computedWidth - (parentGap?.[gapConfig] ?? 0)}
    >
      {children}
    </XYPlot>
  );
};

export default Plot;
