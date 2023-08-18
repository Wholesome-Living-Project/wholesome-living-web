import useLightMode from "@/hooks/useLightMode";
import {
  EXTRA_EXTRA_LARGE_DEVICE_BREAK_POINTS,
  EXTRA_LARGE_DEVICES_BREAK_POINT,
  LARGE_DEVICES_BREAK_POINT,
  MEDIUM_DEVICES_BREAK_POINT,
  SMALL_DEVICES_BREAK_POINT,
} from "@/theme/constants";
import {
  blackA,
  blue,
  blueDark,
  gray,
  grayDark,
  green,
  greenDark,
  red,
  redDark,
  whiteA,
} from "@radix-ui/colors";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

const breakPoints = {
  sm: SMALL_DEVICES_BREAK_POINT,
  md: MEDIUM_DEVICES_BREAK_POINT,
  lg: LARGE_DEVICES_BREAK_POINT,
  xl: EXTRA_LARGE_DEVICES_BREAK_POINT,
  xxl: EXTRA_EXTRA_LARGE_DEVICE_BREAK_POINTS,
};

// Create your theme
const theme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...whiteA,
    ...blackA,
  },
  breakPoints,
};

// Create your dark theme
const darkTheme = {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...whiteA,
    ...blackA,
  },
  breakPoints,
};

export default function Theme({ children }: PropsWithChildren) {
  const { lightMode } = useLightMode();

  return (
    <ThemeProvider theme={lightMode ? theme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}
