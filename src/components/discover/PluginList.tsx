import { plugins, PLUGINS } from "@/helpers/pluginList";
import { SPACING } from "@/theme/theme";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";
import Plugin from "./Plugin";

const Wrapper = styled(Flex)`
  gap: ${SPACING}px;
  flex-wrap: wrap;
`;

const PluginList = () => {
  return (
    <Wrapper row>
      {Object.keys(PLUGINS).map((pluginKey) => (
        <Plugin key={pluginKey} plugin={PLUGINS[pluginKey as plugins]} />
      ))}
    </Wrapper>
  );
};

export default PluginList;