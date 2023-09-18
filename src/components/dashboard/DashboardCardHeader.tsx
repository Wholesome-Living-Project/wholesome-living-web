import { SettingsPluginName } from "@/api/openapi";
import PluginBanner from "@/components/discover/PluginBanner";
import { CaptializedText } from "@/components/ui/CapitalizedText";
import { defaultTextProps } from "@/helpers/defaultTextProps";
import { PLUGINS } from "@/helpers/pluginList";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

type Props = {
  title: string;
  tag?: string;
  description?: string;
  plugin: SettingsPluginName;
  icon: ReactNode;
};

const DashboardCardHeader = ({
  title,
  plugin,
  description,
  tag,
  icon,
}: Props) => {
  return (
    <Flex justify={"between"} mb={"4"}>
      <Flex direction={"column"} gap={"1"}>
        <Flex gap={"2"} direction={"row"} align={"center"}>
          <CaptializedText {...defaultTextProps} size={"2"}>
            {title}
          </CaptializedText>
          {tag && <Badge>{tag}</Badge>}
        </Flex>
        <Text color={"gray"} size={"2"}>
          {description}
        </Text>
      </Flex>
      <PluginBanner {...PLUGINS[plugin]} size={30} icon={icon} />
    </Flex>
  );
};

export default DashboardCardHeader;
