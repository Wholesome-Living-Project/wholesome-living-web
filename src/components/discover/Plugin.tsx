import PluginBanner from "@/components/discover/PluginBanner";
import { PluginType } from "@/helpers/pluginList";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

const Container = styled(Flex)`
  cursor: pointer;
`;

const Plugin = ({ plugin }: { plugin: PluginType }) => {
  return (
    <Container>
      <PluginBanner {...plugin} size={60} />
    </Container>
  );
};

export default Plugin;
