import { SettingsPluginName } from "@/api/openapi";
import { EXTRA_COLORS } from "@/theme/theme";
import { ReactNode } from "react";

export const PLUGIN_COLORS: { [key in SettingsPluginName]: string } = {
  meditation: EXTRA_COLORS.BLUE,
  elevator: EXTRA_COLORS.PURPLE,
  finance: EXTRA_COLORS.SUNSET,
};

export type PluginType = {
  title?: string;
  route?: string;
  color?: string;
  icon?: ReactNode;
};

export const PLUGINS: { [key in SettingsPluginName]: PluginType } = {
  meditation: {
    title: "Meditate",
    color: PLUGIN_COLORS.meditation,
    icon: "meditation",
    route: "meditation",
  },
  finance: {
    title: "Finance",
    color: PLUGIN_COLORS.finance,
    icon: "finance",
    route: "finance",
  },
  elevator: {
    title: "Elevator",
    color: PLUGIN_COLORS.elevator,
    icon: "elevator-passenger",
    route: "elevator",
  },
};
