import { EXTRA_COLORS } from "@/theme/theme";

export enum plugins {
  MEDITATE = "MEDITATE",
  ELEVATOR = "ELEVATOR",
  FINANCE = "FINANCE",
}

export const PLUGIN_COLORS: { [key in plugins]: string } = {
  MEDITATE: EXTRA_COLORS.BLUE,
  ELEVATOR: EXTRA_COLORS.PURPLE,
  FINANCE: EXTRA_COLORS.FINA,
};

export type PluginType = {
  title: string;
  route: string;
  color?: string;
  icon?: string;
};

export const PLUGINS: { [key in plugins]: PluginType } = {
  MEDITATE: {
    title: "Meditate",
    color: PLUGIN_COLORS.MEDITATE,
    icon: "meditation",
    route: "meditation",
  },
  FINANCE: {
    title: "Finance",
    color: PLUGIN_COLORS.FINANCE,
    icon: "finance",
    route: "finance",
  },
  ELEVATOR: {
    title: "Elevator",
    color: PLUGIN_COLORS.ELEVATOR,
    icon: "elevator-passenger",
    route: "elevator",
  },
};
