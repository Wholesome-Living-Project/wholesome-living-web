import { SettingsPluginName } from "@/api/openapi";
import { PLUGINS } from "@/helpers/pluginList";
import { Flex } from "@radix-ui/themes";
import styled from "styled-components";
import Plugin from "./Plugin";

const Wrapper = styled(Flex)`
  flex-wrap: wrap;
`;

const PluginList = () => {
  return (
    <Wrapper gap={"5"}>
      {Object.keys(PLUGINS).map((pluginKey) => (
        <Plugin key={pluginKey} plugin={pluginKey as SettingsPluginName} />
      ))}
    </Wrapper>
  );
};

export default PluginList;
