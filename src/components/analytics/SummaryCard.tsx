import { SettingsPluginName } from "@/api/openapi";
import PluginBanner from "@/components/discover/PluginBanner";
import DashboardCard from "@/components/ui/DashboardCard";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import { PLUGINS } from "@/helpers/pluginList";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

const CaptializedText = styled(Heading)`
  text-transform: uppercase;
`;

type ChangeType = {
  direction: "+" | "-";
  amount: number;
  frequency: "day" | "week" | "month";
};

type Props = {
  icon: ReactNode;
  tag: string;
  change?: ChangeType;
  plugin: SettingsPluginName;
} & PropsWithChildren;

const SummaryCard = ({ tag, change, icon, plugin, children }: Props) => {
  return (
    <DashboardCard>
      <Flex direction={"column"}>
        <Flex justify={"between"}>
          <CaptializedText {...defaultTextProps} size={"2"}>
            {tag}
          </CaptializedText>
          <PluginBanner {...PLUGINS[plugin]} size={40} icon={icon} />
        </Flex>
        <Heading {...defaultTextProps} mb={"3"}>
          2h 50min
        </Heading>
        {change && change.amount > 0 && (
          <Flex gap={"2"} align={"center"}>
            <ArrowUpIcon color={"inherit"} fontSize={"small"} />
            <Text
              color={change.direction === "+" ? "green" : "red"}
            >{`${change.direction} ${change.amount}% from last ${change.frequency}`}</Text>
          </Flex>
        )}
      </Flex>
    </DashboardCard>
  );
};

export default SummaryCard;
